class Best_Element{
    //główna funkcja
    onLoad(data, weights, sorted){
        let elementData = data;
        let confirms = {};
        let forData = {};
        let excludes = [];
        const keys = Object.keys(elementData[0]);
        keys.map(key=>{
            sorted.map(element=>{
                if(element[key] !== undefined){
                    forData[Object.keys(element)[0]] = element[key] === 1? true:false;
                    // forData[Object.keys(element)[0]] = element[key] === 1? true:false;
                }
            }
            )

        })


        confirms = forData;

        for (const keyElement of Object.keys(elementData[0])) {
            if (!Object.keys(confirms).includes(keyElement)) {
              excludes.push(keyElement)
            }
        }



        //nazwy wszystkich kluczy tablic które potem są użyte aby kod działał automatycznie
        const {low, high, new_weights} = this.calculateWeight(keys, weights, excludes);
        

        // ten skrawek kodu generuje bloki poszczególnych kluczy które sprawdzają który element jest najlepszy pod względem tego klucza
        keys.filter(key=>!excludes.includes(key)).forEach(key =>{
            elementData.sort((a, b) => a[key] - b[key])

            // ustawienie najmniejszych oraz największych wartości danego klucza
            low[key] = elementData[0][key];
            high[key] = elementData[elementData.length - 1][key];
        });
        const winning_data = this.result(high, keys, new_weights, confirms, elementData, excludes);
        return({winning_data})
    }


    // funkcja przyjmująca wagi kluczy oraz automatycznie tworząca puste tablice z uzupełnionymi kluczami
    calculateWeight(keys, weights, excludes){
        let low = {};
        let high = {};
        let weightSum = 0;
        let new_weights = weights;

        // tworzenie tablic oraz przyjmowanie wag od użytkownika
        keys.filter(key=>!excludes.includes(key)).forEach(key =>{
            low[key] = 0;
            high[key] = 0;

        });
        
        keys.filter(key=>!excludes.includes(key)).forEach(key =>{
            weightSum += weights[key];
        });

        // dzięki poniższemu skrawkowi kodu, wagi również są zapisywane w formie rozmytej
        keys.filter(key=>!excludes.includes(key)).forEach(key =>{
            new_weights[key] = weights[key] / weightSum;


        });


        return {low, high, new_weights};
    }


    // funkcja podsumowująca dane
    result(high,  keys, weight, sorted, oldElementData, excludes){
        let elementData = oldElementData;
        let confirms = sorted;
        let winning_data = [];


        elementData.map(element => {
            let sum = 0;
            let element_data = {};
            let differences = [];

            //poniższy kod sprawdza czy klucze były wcześniej wybrane jako pozytywne, czy negatywne, po czym konwertuje te dane na liczby rozmyte
            for (let key in confirms) {
                if(confirms[key]){
                    element_data[key] = element[key]/high[key];
                }else{
                    element_data[key] = 1 - element[key]/high[key];

                }
            }

            // podliczanie sumy wszystkich licz
            keys.filter(key=>!excludes.includes(key)).forEach(key =>{
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
            keys.filter(key=>!excludes.includes(key)).map(key => (
                newData[key] = element_data[key] - element_data[key] * weight[key]
                )
            )


            newData["sum"] = sum;


            for (const keyElement of Object.keys(elementData[0])) {
                if (!Object.keys(newData).includes(keyElement)) {
                  newData[keyElement] = element[keyElement]
                }
              }


            if(element.producent !== undefined){
                newData["producent"] = element.producent;
            }
            winning_data.push(newData)

            
            
            // ustalenie kto jest wygranyms
        });




        let countWeight = 0;
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