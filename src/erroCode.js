let errorCode = {
    NO_FOLDER_CODE : 100,
    NO_FOLDER_MESSAGE : "Project folder does not exist",
    INIT_PROJECT_CODE : 101,
    INIT_PROJECT_MESSAGE : "Project fails to be initialized",
    DOMAIN_ALL_CODE: 102,
    DOMAIN_ALL_MESSAGE: "Fails to get all the domains available",
    DOMAIN_CREATE_CODE: 103,
    DOMAIN_GET_CODE: 104,
    DOMAIN_GET_MESSAGE: "Can't get you a domain you request",
    REPO_ALL_CODE: 105,
    REPO_ALL_MESSAGE: "Failed to get all the repository available",
    REPO_GET_CODE: 106,
    REPO_GET_MESSAGE: "Failed to get a domain you request",
    GIT_DELETE_FOLDER_LOCAL_CODE: 107,
    GIT_DELETE_FOLDER_LOCAL_MESSAFE: "Fail to delete local project folder",
    GIT_PULL_CODE: 108,
    GIT_PULL_MESSAGE: "Fail to update project from git",
    GIT_REMOTE_ADD_CODE: 109,
    GIT_REMOTE_ADD_MESSAGE: "Fail to add remote repository",
    GIT_REMOTE_GET_CODE: 200,
    GIT_REMOTE_GET_MESSAGE: "Fail to get remote repository",
    GIT_REMOTE_DELETE_CODE: 201,
    GIT_REMOTE_DELETE_MESSAGE: "Fail to delete remote repository",
    GIT_REMOTE_PUSH_CODE: 202,
    GIT_REMOTE_PUSH_MESSAGE: "Fail to push to remote repository",
    SCHEMA_CREATE_CODE: 203,
    SCHEMA_CREATE_MESSAGE: 'Schema JSON is required',
    REPO_CREATE_CODE: 204,
    REPO_CREATE_MESSAGE: 'Fails to create repository',
    SCHEMA_DELETE_CODE: 205,
    SCHEMA_DELETE_MESSAGE: 'Fails to delete schema',
    DOMAIN_DELETE_CODE: 206,
    DOMAIN_DELETE_MESSAGE: 'Fails to delete a domain',
    REPO_DELETE_CODE: 207,
    REPO_DELETE_MESSAGE: 'Fails to delete a repository',
    GIT_FOLDER_GET_CODE: 208,
    GIT_FOLDER_GET_MESSAGE: 'Fail to get a git project folder'
}

module.exports = errorCode;
