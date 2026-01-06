import pickle

def load_model(path):
    with open(path, "rb") as f:
        return pickle.load(f)

def generate_recommendations(level: int):
    base = {
        0: {
            "diet": "Maintain balanced diet with leafy greens.",
            "lifestyle": "Continue routine exercise & meditation.",
            "cognitive": "Engage in reading, puzzles, and memory games."
        },
        1: {
            "diet": "Add anti-inflammatory foods like turmeric, berries.",
            "lifestyle": "Increase physical activity and reduce screen time.",
            "cognitive": "Daily cognitive training & Ayurvedic herbs."
        },
        2: {
            "diet": "Follow strict anti-inflammatory Ayurvedic diet.",
            "lifestyle": "Frequent meditation, reduced workload.",
            "cognitive": "Seek clinical cognitive therapy with monitoring."
        }
    }
    return base.get(level, {})