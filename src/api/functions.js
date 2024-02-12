const BASE_URL = 'https://front-test.hex.team/api';

export class Users {
    constructor() {
    }

    authorization = async (data) => {
        let response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
            },
            body: JSON.stringify({username: data.username, password: data.password})
        });
        if (!response.ok) {
            throw new Error(`Status: ${response.status}`);
        }
        return await response.json();
    }

    registration = async (data) => {
        let response = await fetch(`${BASE_URL}/register?username=${data.username}&password=${data.password}`, {
            method: 'POST',
            headers: {
                'Authorization': `${data.username}:${data.password}`,
                'Content-Type': 'application/json',
                "Accept": "application/json",
            }
        });
        if (!response.ok) {
            throw new Error(`Status: ${response.status}`);
        }
        return await response.json();
    }
}

export class Links {
    constructor() {
    }

    generation = async (link, token) => {
        let response = await fetch(`${BASE_URL}/squeeze?link=${link}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                "Accept": "application/json",
            }
        });
        if (!response.ok) {
            throw new Error(`Status: ${response.status}`);
        }
        return await response.json();
    }

    statistics = async (token) => {
        let response = await fetch(`${BASE_URL}/statistics`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                "Accept": "application/json",
            }
        });
        if (!response.ok) {
            throw new Error(`Status: ${response.status}`);
        }
        return await response.json();
    }

    sorting = async (token, order, limit) => {
        let response = await fetch(`${BASE_URL}/statistics?order=${order}&offset=0&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                "Accept": "application/json",
            }
        });
        if (!response.ok) {
            throw new Error(`Status: ${response.status}`);
        }
        return await response.json();
    }
}

export const users = new Users();
export const links = new Links();