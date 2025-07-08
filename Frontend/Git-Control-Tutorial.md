# 👨‍💻 Git Collaboration Workflow Guide

This guide is for 2-person team collaboration using Git + GitHub.  
We'll use **branching**, **pull request**, and **code review** to work cleanly and efficiently.

---

## ⚙️ Tools Required
- Git (install: https://git-scm.com/)
- GitHub account (https://github.com/)
- Code Editor (ex: VS Code)

---

## 🚀 Step 1: Clone the Repository

```bash
git clone https://github.com/username/project-name.git
cd project-name
```

---

## 🌱 Step 2: Create a New Branch

> 1 branch = 1 feature / task

```bash
git switch -c feature/nama-fitur
# example:
git switch -c feature/navbar
```

---

## ✍️ Step 3: Coding, Commit, Push

```bash
# after editing your code
git add .
git commit -m "feat: add navbar section"
git push origin feature/navbar
```

---

## 🔀 Step 4: Create Pull Request (PR) via GitHub

1. Go to: https://github.com/username/project-name
2. Click **"Compare & pull request"** on top
3. Fill in:
   - Title: `feat: add navbar section`
   - Description: Explain what you did
4. Click **"Create pull request"**
5. Assign your teammate to review

---

## ✅ Step 5: Merge Pull Request (PR)

> After review is done

- Click **"Merge pull request"** → **Confirm merge**
- (Optional) Delete the feature branch

---

## 🛠 Step 6: Sync Your Local with Main

```bash
git switch main
git pull origin main
```

---

## ⚠️ Tips & Best Practices

- Always **pull before push** to avoid conflict:
  ```bash
  git pull origin nama-branch
  ```
- Use clear commit messages:
  - `feat: add login page`
  - `fix: fix typo in navbar`
  - `docs: update README`

- Don't commit directly to `main` branch!

---

## 🧪 Optional: Merge via CLI (solo project only)

```bash
git checkout main
git pull origin main
git merge feature/nama-fitur
git push origin main
```

---

## 🤝 Branch Naming Convention

| Type     | Example              |
|----------|----------------------|
| Feature  | `feature/navbar`     |
| Fix      | `fix/login-bug`      |
| Docs     | `docs/update-readme` |

---

### 📌 Need Help?

```bash
git status      # check current state
git branch      # list all branches
git log         # see commit history
git diff        # see file differences
```

---
