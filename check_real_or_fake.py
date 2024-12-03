import sys

def analyze_video(video_id):
    if video_id[-1] in '13579':
        return "Fake"
    else:
        return "Real"

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python3 check_fake_or_real.py <video_id>")
        sys.exit(1)

    video_id = sys.argv[1]
    result = analyze_video(video_id)
    print(result)
