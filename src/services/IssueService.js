import axios from 'axios'

const ISSUE_API_BASE_URL ='http://localhost:8080/api/issues'

class IssuesService {
    getIssuesFromNewProject(projectName){
        return axios.get(ISSUE_API_BASE_URL + `/load/${projectName}`);
    }
    getIssuesPage(projectName, page, size){
        return axios.get(ISSUE_API_BASE_URL + `/get/${projectName}`, {
            params: {
                page: page,
                size: size
            }
        });
    }
}

export default new IssuesService()