const ApiService = {
    ListEmployees: () => {
        return fetch('http://localhost:5000/api/employees')
            .then(response => ApiService.HandleErrors(response))
            .then(response => response.json());
    },
    HandleErrors: response => {
        if (!response.ok)
            throw Error(response.responseText);

        return response;
    },
    DeleteEmployee: id => {
        return fetch
            (
                `http://localhost:5000/api/employees`, {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: '{"id":"' + id + '"}',
                    mode: 'cors'
                }
            )
            .then(response => ApiService.HandleErrors(response))
            .then(response => response.json());
    },
    ChartData: () => {
        return fetch('http://localhost:5000/api/chart')
            .then(response => ApiService.HandleErrors(response))
            .then(response => response.json());
    },
    AddEmployee: employee => {
        return fetch
            (
                'http://localhost:5000/api/new',
                {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: employee,
                    mode: 'cors'
                }
            )
            .then(response => ApiService.HandleErrors(response))
            .then(response => response.json());
    },
    UpdateEmployee: employee => {
        return fetch
            (
                'http://localhost:5000/api/update',
                {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: employee,
                    mode: 'cors'
                }
            )
            .then(response => ApiService.HandleErrors(response))
            .then(response => response.json());
    }
}

export default ApiService;