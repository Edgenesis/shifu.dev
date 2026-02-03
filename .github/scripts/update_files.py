import os
import subprocess
from github import Github

def get_previous_release(repo):
    releases = repo.get_releases()
    if releases.totalCount < 2:
        raise Exception("Not enough releases to determine previous release.")
    return releases[1].tag_name

def replace_version_in_file(file_path, old_version, new_version):
    with open(file_path, 'r') as file:
        file_content = file.read()
    
    updated_content = file_content.replace(old_version, new_version)
    
    with open(file_path, 'w') as file:
        file.write(updated_content)

def create_branch_and_push(branch_name):
    subprocess.run(['git', 'checkout', '-b', branch_name])
    subprocess.run(['git', 'add', '.'])
    subprocess.run(['git', 'commit', '-m', f'bump Shifu to {new_version}'])
    subprocess.run(['git', 'push', '--set-upstream', 'origin', branch_name])

def create_pull_request(repo, branch_name, old_version, new_version):
    pr_body = (
        f'**What type of PR is this?**\n\n'
        f'/kind documentation\n\n'
        f'**What this PR does / why we need it:**\n\n'
        f'This PR updates Shifu to {new_version}\n\n'
        f'**Which issue(s) this PR fixes**:\n\n'
        f'Fixes #\n\n'
        f'#### How is this PR tested:\n\n'
        f'- [ ] unit test\n'
        f'- [ ] e2e test\n'
        f'- [ ] other (please specify)\n\n'
        f'**Special notes for your reviewer:**\n\n'
        f'**Does this PR introduce a user-facing change?**\n\n'
        f'```\n'
        f'- bump Shifu from {old_version} to {new_version}\n'
        f'```\n\n'
        f'**Additional documentation e.g., KEPs (Kubernetes Enhancement Proposals), usage docs, etc.:**\n\n'
        f'```\n\n'
        f'```\n\n'
    )
    pr = repo.create_pull(
        title=f'bump Shifu to {new_version}',
        body=pr_body,
        head=branch_name,
        base='main'
    )
    print(f'Pull request created: {pr.html_url}')

if __name__ == "__main__":
    new_version = os.getenv('GITHUB_REF').split('/')[-1]

    token = os.getenv('GITHUB_TOKEN')
    repo_name = os.getenv('GITHUB_REPOSITORY')
    g = Github(token)
    repo = g.get_repo(repo_name)

    previous_version = get_previous_release(repo)
    print(f'PREVIOUS VERSION: {previous_version}. CURRENT VERSION: {new_version}')

    files_to_update = [
        'docs/guides/install/install-shifu-prod.md',
        'docs/guides/telemetryservice/installtelemetryservice.md',
        'i18n/zh-Hans/docusaurus-plugin-content-docs/current/guides/install/install-shifu-prod.md',
        'i18n/zh-Hans/docusaurus-plugin-content-docs/current/guides/telemetryservice/installtelemetryservice.md',
        'src/components/home/News/index.js'
    ]

    for file in files_to_update:
        replace_version_in_file(file, previous_version, new_version)
    
    branch_name = f'tag-{new_version}'
    create_branch_and_push(branch_name)
    
    create_pull_request(repo, branch_name, previous_version, new_version)
