

export const generateId = () => {
    // id should be 20 characters long
    const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    return id;
}