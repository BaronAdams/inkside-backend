

export const generateId = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789'
    let uniqueId = ''
    for (let i = 0; i < 6; i++) {
        uniqueId += '0123456789'[Math.floor(Math.random()*10)]; 
    }
    for (let j = 0; j < 19; j++) {
        uniqueId += characters[Math.floor(Math.random()*36)]; 
    }
    return uniqueId
}

