const ApiService = {
    ListEmployees: () => {
        return fetch('http://localhost:5000/api/employees')
            .then(response => ApiService.TratarErros(response))
            .then(response => response.json());
    },
    TratarErros: response => {
        if (!response.ok)
            throw Error(response.responseText);

        return response;
    },
    DeleteEmployee: id => {
        return fetch
            (
                `http://localhost:5000/api/employees/${id}`,
                {
                    method: 'DELETE',
                    headers: { 'content-type': 'application/json' }
                }
            )
            .then(response => ApiService.TratarErros(response))
            .then(response => response.json());
    }
}

export default ApiService;