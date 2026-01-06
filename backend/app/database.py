import sqlite3
import json
import logging
from datetime import datetime
from typing import Dict, Any, List, Optional
from werkzeug.security import generate_password_hash, check_password_hash

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class DatabaseManager:
    """Manages all database operations for the Care Catalyst application."""
    
    def __init__(self, db_path: str = 'care_catalyst.db'):
        """
        Initializes the DatabaseManager.
        :param db_path: Path to the SQLite database file.
        """
        self.db_path = db_path
        self.init_database()
    
    def get_connection(self) -> sqlite3.Connection:
        """
        Gets a database connection with a Row factory for dictionary-like access.
        """
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        return conn
    
    def init_database(self):
        """Initializes the database with all the necessary tables if they don't exist."""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            
            # Users table
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    email TEXT UNIQUE NOT NULL,
                    password_hash TEXT NOT NULL,
                    first_name TEXT NOT NULL,
                    last_name TEXT NOT NULL,
                    age INTEGER,
                    phone TEXT,
                    gender TEXT,
                    is_admin BOOLEAN DEFAULT FALSE,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            ''')
            
            # Assessments table
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS assessments (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER NOT NULL,
                    cognitive_score REAL NOT NULL,
                    prakriti_type TEXT NOT NULL,
                    prakriti_scores TEXT NOT NULL, -- Stored as JSON
                    risk_score REAL NOT NULL,
                    risk_level TEXT NOT NULL,
                    assessment_data TEXT NOT NULL, -- Stored as JSON
                    ml_prediction TEXT, -- Stored as JSON
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
                )
            ''')
            
            # Recommendations table
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS recommendations (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER NOT NULL,
                    assessment_id INTEGER NOT NULL,
                    dietary_recommendations TEXT,
                    lifestyle_recommendations TEXT,
                    mental_wellness_recommendations TEXT,
                    preventive_care_recommendations TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
                    FOREIGN KEY (assessment_id) REFERENCES assessments (id) ON DELETE CASCADE
                )
            ''')
            
            # User progress tracking table
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS user_progress (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER NOT NULL,
                    assessment_id INTEGER NOT NULL,
                    progress_data TEXT NOT NULL, -- Stored as JSON
                    notes TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
                    FOREIGN KEY (assessment_id) REFERENCES assessments (id) ON DELETE CASCADE
                )
            ''')
            
            # System logs table
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS system_logs (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER,
                    action TEXT NOT NULL,
                    details TEXT,
                    ip_address TEXT,
                    user_agent TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET NULL
                )
            ''')
            
            conn.commit()
        
        self._create_default_users()
        logger.info("Database checked and initialized successfully.")
    
    def _create_default_users(self):
        """Creates default admin and test users if they don't already exist."""
        try:
            if not self.get_user_by_email('admin@carecatalyst.com'):
                self.create_user({
                    'email': 'admin@carecatalyst.com', 'password': 'password123',
                    'first_name': 'Admin', 'last_name': 'User', 'is_admin': True
                })
                logger.info("Created default admin user.")
            
            if not self.get_user_by_email('user@example.com'):
                self.create_user({
                    'email': 'user@example.com', 'password': 'password123',
                    'first_name': 'Test', 'last_name': 'User', 'age': 45, 'is_admin': False
                })
                logger.info("Created default test user.")
                
        except Exception as e:
            logger.error(f"Error creating default users: {e}")

    def create_user(self, user_data: Dict[str, Any]) -> Optional[int]:
        """Creates a new user and returns their ID."""
        try:
            with self.get_connection() as conn:
                password_hash = generate_password_hash(user_data['password'])
                cursor = conn.execute('''
                    INSERT INTO users (email, password_hash, first_name, last_name, age, phone, gender, is_admin) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                ''', (
                    user_data['email'], password_hash, user_data['first_name'], user_data['last_name'],
                    user_data.get('age'), user_data.get('phone'), user_data.get('gender'), user_data.get('is_admin', False)
                ))
                user_id = cursor.lastrowid
                conn.commit()
                logger.info(f"Created user: {user_data['email']} with ID: {user_id}")
                return user_id
        except sqlite3.IntegrityError:
            logger.warning(f"Attempted to create a user with an existing email: {user_data['email']}")
            return None
        except Exception as e:
            logger.error(f"Error creating user {user_data['email']}: {e}")
            return None

    def get_user_by_email(self, email: str) -> Optional[sqlite3.Row]:
        """Retrieves a user by their email address."""
        try:
            with self.get_connection() as conn:
                return conn.execute('SELECT * FROM users WHERE email = ?', (email,)).fetchone()
        except Exception as e:
            logger.error(f"Error getting user by email {email}: {e}")
            return None

    def get_user_by_id(self, user_id: int) -> Optional[sqlite3.Row]:
        """Retrieves a user by their ID."""
        try:
            with self.get_connection() as conn:
                return conn.execute('SELECT * FROM users WHERE id = ?', (user_id,)).fetchone()
        except Exception as e:
            logger.error(f"Error getting user by ID {user_id}: {e}")
            return None
            
    def save_assessment(self, assessment_data: Dict[str, Any]) -> Optional[int]:
        """Saves assessment results and returns the new assessment ID."""
        try:
            with self.get_connection() as conn:
                cursor = conn.execute('''
                    INSERT INTO assessments (user_id, cognitive_score, prakriti_type, prakriti_scores, risk_score, risk_level, assessment_data, ml_prediction) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                ''', (
                    assessment_data['user_id'], assessment_data['cognitive_score'],
                    assessment_data['prakriti_type'], json.dumps(assessment_data['prakriti_scores']),
                    assessment_data['risk_score'], assessment_data['risk_level'],
                    json.dumps(assessment_data['raw_data']), json.dumps(assessment_data.get('ml_prediction', {}))
                ))
                assessment_id = cursor.lastrowid
                conn.commit()
                logger.info(f"Saved assessment ID {assessment_id} for user ID {assessment_data['user_id']}")
                return assessment_id
        except Exception as e:
            logger.error(f"Error saving assessment for user {assessment_data.get('user_id')}: {e}")
            return None

    def get_assessment(self, assessment_id: int, user_id: int) -> Optional[Dict[str, Any]]:
        """Retrieves a specific assessment for a user."""
        try:
            with self.get_connection() as conn:
                assessment_row = conn.execute('SELECT * FROM assessments WHERE id = ? AND user_id = ?', (assessment_id, user_id)).fetchone()
                if assessment_row:
                    assessment = dict(assessment_row)
                    # Deserialize JSON fields back into Python objects
                    assessment['prakriti_scores'] = json.loads(assessment['prakriti_scores'])
                    assessment['assessment_data'] = json.loads(assessment['assessment_data'])
                    assessment['ml_prediction'] = json.loads(assessment['ml_prediction'] or '{}')
                    return assessment
                return None
        except Exception as e:
            logger.error(f"Error getting assessment ID {assessment_id}: {e}")
            return None
            
    def get_user_assessments(self, user_id: int) -> List[Dict[str, Any]]:
        """Retrieves all assessments for a specific user."""
        try:
            with self.get_connection() as conn:
                assessments_rows = conn.execute('SELECT * FROM assessments WHERE user_id = ? ORDER BY created_at DESC', (user_id,)).fetchall()
                assessments = []
                for row in assessments_rows:
                    assessment = dict(row)
                    # Deserialize JSON fields
                    assessment['prakriti_scores'] = json.loads(assessment['prakriti_scores'])
                    assessment['assessment_data'] = json.loads(assessment['assessment_data'])
                    assessment['ml_prediction'] = json.loads(assessment['ml_prediction'] or '{}')
                    assessments.append(assessment)
                return assessments
        except Exception as e:
            logger.error(f"Error getting assessments for user ID {user_id}: {e}")
            return []