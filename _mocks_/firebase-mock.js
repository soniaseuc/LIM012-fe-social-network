const auth = jest.fn(() => ({ 
    signInWithEmailAndPassword: (email, password) => { 
        return new Promise((resolve) => { 
            resolve({ email: email }) 
        }) 
    } 
}))

const firebase = {
    auth : auth,
}


// export default jest.fn(()=> firebase);