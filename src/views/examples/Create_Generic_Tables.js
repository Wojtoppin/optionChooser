/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { useEffect, useState } from "react";

// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

const Create_Generic_Tables = () => {
  const [producers, setProducers] = useState({});
  const [isASC, setIsASC] = useState({ID:"ASC", name:"ASC", cena:"ASC", przebieg:"ASC", klimatyzacja:"ASC", sredni_koszt_naprawy:"ASC", producer:"ASC"});
  const [cars, setCars] = useState([]);

  const [filteredCars, setFilteredCars] = useState({});
  const [filterText, setFilterText] = useState('');
  const [filterPrice, setFilterPrice] = useState(0);
  const [filterCourse, setFilterCourse] = useState(0);
  const [filterRepair, setFilterRepair] = useState(0);
  const [filterProducer, setFilterProducer] = useState("null");
  const [filterACValue, setFilterACValue] = useState("");

  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(0);
  const [courseMin, setCourseMin] = useState(0);
  const [courseMax, setCourseMax] = useState(0);
  const [repairMin, setRepairMin] = useState(0);
  const [repairMax, setRepairMax] = useState(0);
  
  const [isTablesVisible, setIsTablesVisible] = useState(true);
  const [currentAction, setCurrentAction] = useState("Filtering data ");
  const [formData, setFormData] = useState({name: "", cena: 0, przebieg:0, klimatyzacja:0, sredni_koszt_naprawy:0});
  const [topTableText, setTopTableText] = useState("")
  const [topTableTextColor, setTopTableTextColor] = useState("red")//rgb(255, 0, 0)  rgb(0, 255, 0)

  const toggleSortingOrder = (columnName) => {
    const currentOrder = isASC[columnName];
    const newOrder = currentOrder === "ASC" ? "DESC" : "ASC";
    setIsASC({ ...isASC, [columnName]: newOrder });
  };

  const refreashData = (code="", direction="") =>{
    let link = `http://localhost:3040/data`;
    if(code !== "" && direction !== ""){
        link += `/${direction}/${code}`;
    }
    fetch(link)
    .then(response => response.json())
    .then(data => {
        setCars(data);
        setFilteredCars(data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
  }

  const minMax = () =>{
    fetch(`http://localhost:3040/data`)
    .then(response => response.json())
    .then(data => {
      let maxPrice = 0;
      let maxCourse = 0;
      let maxRepair = 0;
      data.map(element =>{
        if(element.cena > maxPrice){
          maxPrice = element.cena;
        }
        if(element.przebieg > maxCourse){
          maxCourse = element.przebieg;
        }
        if(element.sredni_koszt_naprawy > maxRepair){
          maxRepair = element.sredni_koszt_naprawy;
        }
      })
      let minPrice = maxPrice;
      let minCourse = maxCourse;
      let minRepair = maxRepair;
      data.map(element=>{
        if (element.cena < minPrice){
          minPrice = element.cena;
        }
        if(element.przebieg < minCourse){
          minCourse = element.przebieg;
        }
        if(element.sredni_koszt_naprawy < minRepair){
          minRepair = element.sredni_koszt_naprawy;
        }
      })
      setFilterPrice(maxPrice);
      setFilterCourse(maxCourse);
      setFilterRepair(maxRepair);

      setPriceMin(minPrice);
      setPriceMax(maxPrice);

      setCourseMin(minCourse);
      setCourseMax(maxCourse);
      
      setRepairMin(minRepair);
      setRepairMax(maxRepair);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
    
  }

  const refreashProducers = () =>{
    let link = `http://localhost:3040/producent`;
    
    fetch(link)
    .then(response => response.json())
    .then(data => {
        setProducers(data);

    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
  }

  const filterCars = () =>{
    
    let new_car_data = cars.filter(
      (car) => car.name.toLowerCase().includes(filterText.toLowerCase())
        && car.cena <= filterPrice
          && car.przebieg <= filterCourse
            && car.sredni_koszt_naprawy <= filterRepair
              && (filterProducer  !== "null"? car.producer === filterProducer: true)
               && (filterACValue === "works"? car.klimatyzacja === 1 : filterACValue === ""? true: car.klimatyzacja === 0)
    );
    setFilteredCars(new_car_data);

  }

  const handleFilteredText = (event) =>{
    setFilterText(event.target.value)
  }

  const handleSliderChange = (event, num) => {
    const newValue = parseInt(event.target.value);
    if(num === 1){
      setFilterPrice(newValue);
      filterCars();
    }else{
      if (num === 2){
        setFilterCourse(newValue);
        filterCars();
      }else{
        setFilterRepair(newValue);
        filterCars();
      }
      
    }
  };

  const setFilterProducerFunction = (producer) =>{
    setFilterProducer(producer);
    inputValidChecker();
  }

  const handleSwitchButton = () =>{
    const question = currentAction === "Filtering data ";
    setCurrentAction(question ? "Adding data ": "Filtering data ");
    setIsTablesVisible(!question);
    document.title = document.title === 'Filtering data' ? 'Adding data': 'Filtering data';
  }

  const handleACbutton = () =>{
    if (filterACValue === ""){
      setFilterACValue("works")
    }else{
      if (filterACValue === "works"){
        setFilterACValue("doesn't work")
      }else{
        setFilterACValue("")
      }
    }
  }

  const handleSubmitForm = (event) =>{
    let new_form_data = {name: formData.name, cena: formData.cena, przebieg: formData.przebieg, klimatyzacja: formData.klimatyzacja, sredni_koszt_naprawy:formData.sredni_koszt_naprawy, producer_id:filterProducer}
  
    event.preventDefault();
    fetch('http://localhost:3040/addData', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(new_form_data),
    })
    .then(response => response.json())
    .then(data => {
        refreashData();
        setTopTableText('Response from server:' +  data.message);
        setTopTableTextColor("green");
        setFormData({ name: "", cena: 0, przebieg: 0, klimatyzacja: 0, sredni_koszt_naprawy: 0});

    })
    .catch(error => {
        setTopTableText('Error sending POST request');
        setTopTableTextColor("red");

        console.error('Error sending POST request:', error);
    });
  }

  const handleChange = (event) =>{
    
    let {name, value, type, checked} = event.target;
    if (type === "checkbox"){
        setFormData((data)=>({
            ...data,
            [name]: checked? 1:0
        }))
    }
    else{
        setFormData({ ...formData, [name]:value });
    }
  }

  const inputValidChecker = () =>{
    let infoText = "";
    if(formData.name.length <= 0 || formData.name.length > 30){
      infoText += "Car model ";
    }
    if(formData.cena <= 0){
      infoText += "Price ";
    }
    if(formData.przebieg <= 0){
      infoText += "Course ";
    }
    if(formData.sredni_koszt_naprawy <= 0){
      infoText += "Average repair price ";
    }
    if(filterProducer === "null"){
      infoText += "Producer ";
    }
    if(infoText.length>0){
      setTopTableText("Incorrect values at: " + infoText);
      setTopTableTextColor("red");

    }else{
      setTopTableText("Correct values")
      setTopTableTextColor("green");

    }
  }
  
  useEffect(() => {
    document.title = 'Filtering data';
    refreashData();
    refreashProducers();
    minMax();
  }, []);

  useEffect(() => {
    inputValidChecker();
    filterCars();
  }, [filterProducer]);

  useEffect(() => {
    filterCars();
  }, [filterACValue]);

  useEffect(() => {
    inputValidChecker();
  }, [formData]);






  
  return (
    <>
      <Header/>

      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
          <Card className="shadow">
              
          <CardHeader className="border-0">

          <div style={{color:topTableTextColor}}>{topTableText}</div>

          <div style={{float:"right"}} className="mb-0">
                {currentAction}
                <button onClick={handleSwitchButton}>change Action</button>
              </div>
          </CardHeader>
        <form onSubmit={handleSubmitForm}>
           
           <Table
            // style={{textAlign:"center"}}
            className="align-items-center table-flush"
            responsive
            
          >
            <thead className="thead-light">
            <tr>
                <th scope="col">index</th><th>value</th><th>range used in other cars</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <th><label htmlFor="name">Car model: </label></th>
                <th><input type="text" name="name" id="name" value={formData.name} onChange={handleChange}/></th>
                <th>e.g. "Chevrolet Camaro"</th>

              </tr>

              <tr>
                <th><label htmlFor="cena">Price: </label></th>
                <th><input type="number" step="50" name="cena" id="cena" min="0" value={formData.cena} onChange={handleChange}/></th>
                <th>{priceMin}$ - {priceMax}$</th>
              </tr>
              
              <tr>
                <th><label htmlFor="przebieg">Course: </label></th>
                <th><input type="number" step="50"  name="przebieg" min="0" id="przebieg" value={formData.przebieg} onChange={handleChange}/></th>
                <th>{courseMin} km - {courseMax} km</th>

              </tr>
              
              <tr>
                <th><label htmlFor="klimatyzacja">Air Conditioning: </label></th>
                <th><input type="checkbox" name="klimatyzacja" id="klimatyzacja" value={formData.checkbox} onChange={handleChange}/>{""}</th>
                <th></th>
              </tr>
              
              <tr>
                <th><label htmlFor="sredni_koszt_naprawy">Average repair price: </label></th>
                <th><input type="number" step="20" min="0" name="sredni_koszt_naprawy" id="sredni_koszt_naprawy" value={formData.sredni_koszt_naprawy} onChange={handleChange}/></th>
                <th>{repairMin}$ - {repairMax}$</th>

              </tr>
              
              <tr>
                <th>Producer</th>
                <th>
                  <select name="producer" onChange={(e) => setFilterProducerFunction(e.target.value)}>
                    <option value="null"></option>
                    {Array.isArray(producers) &&
                      producers !== undefined &&
                      producers.map((element) => (
                        <option key={element.id} value={element.id}>
                          {element.producer}
                        </option>
                      ))}
                  </select>
                </th>
                <th></th>
              </tr>

            </tbody>
            <tfoot>
              <tr>
                <th colSpan={3} style={{textAlign:"center"}}>
                  <button type="submit" disabled={topTableTextColor === "red"}>Wyślij</button>
                </th>
              </tr>
            </tfoot>
          </Table>
        </form>



        </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Create_Generic_Tables;
