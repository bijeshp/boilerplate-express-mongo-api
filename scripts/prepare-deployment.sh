#!/bin/bash
#--- Takes branch name and release tag name as paramters
BRANCH_NAME=$0
RELEASE_TAG=$1
echo "\n\nPrepareing Release from '$1' with tag '$2'"
echo "=========================================================="
# Merge branch to master
echo "\n\n1. Merging  '$1' to Master Branch"
echo "----------------------------------------------------------"
echo "* Checking out Master Branch--> Started"
git checkout master
echo "  Checking out Master Branch--> Done\n" 

echo "* Pulling From Master--> Started"
git pull origin master
echo "  Pulling From Master--> Done\n"

echo "* Merging $1 to Master Branch--> started"
git merge $1
echo "  Merging $1 to Master Branch--> Done\n"

echo "* Pushing to Master--> Started"
git push origin master
echo "  Pushing to Master--> Done\n"

# Create a release tag on Master

echo "\n\n2. Creating Release Tag  '$2'"
echo "----------------------------------------------------------"
echo "* Creating Release tag--> Started"
git tag $2
git push origin --tags
echo "  Creating Release tag--> Done\n"

echo "\n\n3. Preparing Release Notes for '$2'"
echo "----------------------------------------------------------"
# Generate release notes from the tag name
echo "* Generating Release Notes--> Started"

GIT_RELEASE_NOTES=$(git log --pretty="%h - %s (%an)" $2)
CURRENT_DATE=$(date +'%m-%d-%Y_%H:%M%p')
RELEASE_NOTES_FILE=./release_notes/${CURRENT_DATE}_$2.txt
echo "$GIT_RELEASE_NOTES" >> "$RELEASE_NOTES_FILE"

echo "  Generating Release Notes--> Done\n"
git add $RELEASE_NOTES_FILE
git commit -m  "Release notes for $2"
git push
