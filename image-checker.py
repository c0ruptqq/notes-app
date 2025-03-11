import os
import re
import argparse
from pathlib import Path

def find_non_standard_image_links(root_dir):
    """
    Recursively search through markdown files and find those with image links 
    that don't start with '/img/'.
    
    Args:
        root_dir (str): Root directory to start the search
        
    Returns:
        dict: Dictionary with file paths as keys and lists of non-standard image links as values
    """
    results = {}
    
    # Regular expression to find markdown image links
    # This matches ![alt text](link) pattern
    image_link_pattern = re.compile(r'!\[.*?\]\((.*?)\)')
    
    # Walk through the directory structure
    for dirpath, _, filenames in os.walk(root_dir):
        # Filter for markdown files
        for filename in [f for f in filenames if f.endswith(('.md', '.markdown'))]:
            file_path = os.path.join(dirpath, filename)
            
            try:
                with open(file_path, 'r', encoding='utf-8') as file:
                    content = file.read()
                    
                    # Find all image links
                    image_links = image_link_pattern.findall(content)
                    
                    # Filter for links that don't start with /img/
                    non_standard_links = [link for link in image_links if not link.startswith('/img/')]
                    
                    # If we found any non-standard links, add to results
                    if non_standard_links:
                        results[file_path] = non_standard_links
                        
            except Exception as e:
                print(f"Error processing {file_path}: {e}")
    
    return results

def main():
    parser = argparse.ArgumentParser(description='Find markdown files with image links not starting with /img/')
    parser.add_argument('directory', help='Root directory to search')
    parser.add_argument('--output', '-o', help='Output file for results (optional)')
    
    args = parser.parse_args()
    
    if not os.path.isdir(args.directory):
        print(f"Error: {args.directory} is not a valid directory")
        return
    
    print(f"Searching for non-standard image links in {args.directory}...")
    results = find_non_standard_image_links(args.directory)
    
    if not results:
        print("No files with non-standard image links found.")
        return
    
    # Display or save results
    output_text = f"Found {len(results)} files with non-standard image links:\n\n"
    
    for file_path, links in results.items():
        relative_path = os.path.relpath(file_path, args.directory)
        output_text += f"\n{relative_path}:\n"
        for link in links:
            output_text += f"  - {link}\n"
    
    if args.output:
        with open(args.output, 'w', encoding='utf-8') as f:
            f.write(output_text)
        print(f"Results saved to {args.output}")
    else:
        print(output_text)

if __name__ == "__main__":
    main()