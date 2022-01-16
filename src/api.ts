import $ from "jquery"
import {Router} from "vue-router";
import {pushErrorMsg} from "./components/ErrorMessageSidebar/ErrorSidebar.vue";

const useFake: boolean = false
const apiPath: string = window.location.origin
let apiSessionToken: string = ""

let loggedIn: boolean = false

$.ajaxSetup({
    method: "POST",
    dataType: "json",
    contentType: "application/json",
})


export function isLoggedIn() {
    return loggedIn
}


let router: Router;

export function setRouter(r: Router) {
    router = r
}


export interface DockerContainerPort {
    PrivatePort: number
    PublicPort: number
    Type: string
}

export interface DockerContainer {
    readonly Id: string
    readonly Names: string[]
    readonly Created: number
    readonly Image: string
    readonly ImageID: string
    readonly State: string
    readonly Status: string
    readonly Ports: DockerContainerPort[]
    readonly Labels: Record<string, string>
}

export function formatDockerContaienrPortsString(ports: DockerContainerPort[]): string {
    let result = ""
    ports.forEach(value => {
        result = result + `${value.PublicPort}:${value.PrivatePort} ; `
    })
    return result
}


function _getRandomName(i: int){
    let s = ""
    for (let j = 0; j < i; j++) {
        s = s + "X"
    }
    return s
}

function generateFakeContainerList(count: number): DockerContainer[] {
    let array = new Array<DockerContainer>()
    for (let i = 0; i < count; i++) {
        array.push({
            Id: "fakeid",
            Image: `fakeimage ${_getRandomName(i*10)}`,
            ImageID: "totally_real-image-id+dawdfiojabfIOAU",
            Labels: {
                "example_labelekey": "example_value"
            },
            Names: [`Name ${i}`, "FakeContainer"],
            Created: 1367854155,
            Ports: [
                {
                    PublicPort: 69420,
                    PrivatePort: 100,
                    Type: "to"
                },
                {
                    PublicPort: 69820,
                    PrivatePort: 10,
                    Type: "to"
                }
            ],
            State: "Exited",
            Status: "Exit 0"
        })
    }
    return array
}

function getApiErrorMsg(code: number): string {
    switch (code) {
        case 404:
            return "The api endpoint cannot be found!"
        case 400:
            return "Bad request to api"
        case 401:
            return "Unauthorised"
        default:
            return "An Unknown error has occured."
    }
}


function requestApi(path: string, data: Object={}): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        $.ajax({
            method: "POST",
            dataType: "json",
            contentType: "application/json",
            url: path,
            headers:{
                token:apiSessionToken
            },
            data: JSON.stringify(data),
            success: (out) => {
                console.log(out)
                resolve(out)
            }
        }).catch((fail) => {
            {
                reject(fail)
            }
        })
    })
}

export function getListOfContainers(): Promise<DockerContainer[]> {
    if (useFake) {
        return new Promise<DockerContainer[]>((resolve, reject) => resolve(generateFakeContainerList(50)))
    } else {
        return new Promise<DockerContainer[]>((resolve, reject) => {
            requestApi("/api/containers/all")
                .then(value => {
                    resolve(value.containers)
                }).catch(reason => {
                    reject(reason)
            })
        })
    }
}

export function startContainers(containers: DockerContainer[]): Promise<string> {

    return new Promise<string>((resolve, reject) => {
        $.post(apiPath + "/api/start_containers", containers)
            .done(data => {
                resolve(data)
            }).catch((fail) => {
            pushErrorMsg({
                title: "Failed to start containers",
                code: `${fail.status}`,
                message: `${getApiErrorMsg(fail.status)}`,
            });


            reject(fail.status)
        })
    })
}

export function apiLogout() {
    apiSessionToken = ""
    loggedIn = false
}

export function apiLogin(apiKey: string): Promise<undefined> {
    apiSessionToken = ""
    return new Promise<undefined>(((resolve, reject) => {

        $.ajax({
            url: "/api/getToken",
            data: JSON.stringify({key: apiKey})
        }).done((data) => {
            loggedIn = true
            apiSessionToken = data.token
            resolve(undefined)
        })
            .catch((fail) => {
                pushErrorMsg({
                    title: "Login Failed",
                    code: fail.status,
                    message: getApiErrorMsg(fail.status) + " | " + fail.responseText
                });
                reject()
            })
    }));
}

