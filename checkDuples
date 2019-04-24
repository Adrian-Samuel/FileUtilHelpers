// Will check for duplicates in the first row and outputs a file of those duplicates

const fs = require('fs');

const checkForDupes = (filename) => {
    const info = fs.readFileSync(filename, 'utf8').split(/\r?\n/g);
    let array = [];
    info.forEach((x, i) => {
        if (i != 0) {
            array.push(x.split(',')[0])
        }
    });
   
    const extra = array.reduce((acc, curr) => {
        if (acc[curr]) {
            const current = acc[curr];
            const newAmount = current + 1;
            acc[curr] = newAmount
        } else {
            acc[curr] = 1
        }
        return acc;
    }, {});
 
    const removeOnes = Object.entries(extra).filter(x => x[1] > 1);
    const final = removeOnes.map(numbers => {
        return {
            duplicateNumber: numbers[0],
            amountDuplicated: numbers[1]
        }
    });

    for (const [index, val] of final.entries()) {
        if (index == 0) {
            fs.appendFileSync('duplicate.csv', `${Object.keys(val).join(',')}\n`, 'utf8');
        }
        fs.appendFileSync('duplicate.csv', `${val.duplicateNumber}, ${val.amountDuplicated}\n`, 'utf8');
    }
    return final;

}

console.log(checkForDupes('words.csv'));


module.exports = {checkForDupes}



