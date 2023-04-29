<template>
    <div>
        <div>
            <v-select
                label="Select"
                v-model="projectName"
                :items="['FEEDUVL', 'ISWRE22T1']"
            ></v-select>

            <v-btn dark color="blue" @click="setProjectName()"> SEARCH </v-btn>
        </div>
        <div>
            <v-card class="v-card">

                <v-data-table
                    :headers="headers"
                    :items="issues"
                    item-value="id"
                    sort-by="issueId"
                    class="elevation-1"
                    :footer-props="{
               'items-per-page-text':'Issues per Page',
               'items-per-page-options': [5, 10, 20, 50, -1],
             }"
                    :items-per-page="this.pageSize"
                    :page="pageNum"
                    :server-items-length="this.totalItems"
                    @update:items-per-page="getItemPerPage"
                    @update:page="getPageNum"

                >
                    <template v-slot:top>
                        <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Suche"
                        ></v-text-field>
                    </template>
                </v-data-table>
            </v-card>

        </div>
    </div>

</template>

<script>
import IssuesService from "@/services/IssueService";
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Issue",
    data() {
        return {
            headers: [
                {
                    title: "Issues",
                    align: "start",
                    sortable: true,
                },
                {text: "Issue ID", value: "issueId"},
                {text: "Issue Name", value: "key"},
                {text: "Project Name", value: "projectName"}
            ],
            issues: [],
            search:"",
            totalItems: 0,
            pageNum: 1,
            pageSize: 5,
            projectName: "",
        }
    },
    methods: {
        getIssuesFromNewProject() {
            IssuesService.getIssuesFromNewProject(this.projectName).then(
                this.getIssuesPage
            )
        },
        getIssuesPage() {
            IssuesService.getIssuesPage(this.projectName, this.pageNum, this.pageSize).then((response) => {
                    const {issues, totalItems} = response.data;
                    this.issues = issues
                    this.totalItems = totalItems

                    console.log(response.data)
                    console.log(totalItems)
            })
        },
        getItemPerPage(val) {
            this.pageSize = val;
            this.getIssuesPage()
        },
        getPageNum(val) {
            this.pageNum = val
            this.getIssuesPage()
        },
        setProjectName(){
            this.getIssuesFromNewProject()
        }
    },
    computed: {
        getData(){
            if(this.search === ""){
                return this.issues
            }else{
                return this.filterData()
            }

        },
        filterData(){
            const issues = this.issues
            const newIssues = []
            issues.filter(item => {
                let id = item.id.toLowerCase().includes(this.search.toLowerCase())
                if(id === true){
                    newIssues.push(item)
                }
            })
            return issues
        }
    },
    created() {
        this.getIssuesPage()
        this.getIssuesFromNewProject()
    },

}
</script>

<style>
.v-card{
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 80px;
}
</style>