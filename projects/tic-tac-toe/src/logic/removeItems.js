
export const removeItem = (key) => {
    return new Promise((resolve, reject) => {
        try {
            window.localStorage.removeItem(key);
            resolve({ succes: true });
            
        } catch (error) {
            reject({ succes: false });
        }
    });
};