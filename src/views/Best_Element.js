class Best_Element{
    //główna funkcja
    onLoad(data, weights, sorted){
        let elementData = data;
        
        //nazwy wszystkich kluczy tablic które potem są użyte aby kod działał automatycznie
        const keys = Object.keys(elementData[0]);
        const {low, high, new_weights} = this.calculateWeight(keys, weights);
        

        // ten skrawek kodu generuje bloki poszczególnych kluczy które sprawdzają który element jest najlepszy pod względem tego klucza
        keys.slice(2, -1).forEach(key =>{
            elementData.sort((a, b) => a[key] - b[key])

            // ustawienie najmniejszych oraz największych wartości danego klucza
            low[key] = elementData[0][key];
            high[key] = elementData[elementData.length - 1][key];
        });
        const winning_data = this.result(high, keys, new_weights, sorted, elementData);
        return({winning_data})

    }


    // funkcja przyjmująca wagi kluczy oraz automatycznie tworząca puste tablice z uzupełnionymi kluczami
    calculateWeight(keys, weights){
        let low = {};
        let high = {};
        let weightSum = 0;
        let new_weights = weights;

        // tworzenie tablic oraz przyjmowanie wag od użytkownika
        keys.slice(2, -1).forEach(key =>{
            low[key] = 0;
            high[key] = 0;
        });

        for (let key in new_weights) {
            weightSum += new_weights[key];
        }

        // dzięki poniższemu skrawkowi kodu, wagi również są zapisywane w formie rozmytej
        for (let key in new_weights) {
            new_weights[key] = new_weights[key] / weightSum;
        }

        return {low, high, new_weights};
    }


    // funkcja podsumowująca dane
    result(high,  keys, weight, sorted, oldElementData){
        let elementData = oldElementData;
        let forData = {};
        let confirms = {}
        let new_data_test = []

        for (let key in sorted[0]) {
            if (sorted[0].hasOwnProperty(key) && key !== "ID") {
                forData[key] = sorted[0][key] == 1 ? true : false;
            }
        }
        let winning_data = [];
        confirms = forData;

        elementData.map(element => {
            let sum = 0;
            let element_data = {};

            //poniższy kod sprawdza czy klucze były wcześniej wybrane jako pozytywne, czy negatywne, po czym konwertuje te dane na liczby rozmyte
            for (let key in confirms) {
                if(confirms[key]){
                    element_data[key] = element[key]/high[key];
                }else{
                    element_data[key] = 1 - element[key]/high[key];

                }
            }

            // podliczanie sumy wszystkich licz
            keys.slice(2, -1).forEach(key =>{
                if(weight[key] !== 0){
                    if(weight[key]===1){
                        weight[key]=0.999;
                    }
                    sum += element_data[key] - element_data[key] * weight[key];
                }else{
                    element_data[key] = 0;
                }
            })

            
            
            let newData = {}
            keys.slice(2, -1).map(key => (
                
                newData[key] = element_data[key] - element_data[key] * weight[key]
                )

            )
            newData["name"] = element.name;
            newData["sum"] = sum;
            

            winning_data.push(newData)

            
            
            // ustalenie kto jest wygranyms
        });
        console.log(winning_data);
        console.log(new_data_test);




        let countWeight = 0;
        let max_sum = 0;
        for (let element in weight) {
            if(element != 0){
                countWeight++;
            }
        }

        winning_data.map(element=>{
            element["sum"] = element["sum"]/countWeight;
        });
        winning_data.sort((a,b)=> b["sum"] - a["sum"])
        
        return winning_data;
    }
}
export default Best_Element;