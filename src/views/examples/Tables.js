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

const Tables = () => {
  const [producers, setProducers] = useState({});
  const [isASC, setIsASC] = useState({ID:"ASC", name:"ASC", cena:"ASC", przebieg:"ASC", klimatyzacja:"ASC", sredni_koszt_naprawy:"ASC", producer:"ASC"});
  const [cars, setCars] = useState([]);

  const [filteredCars, setFilteredCars] = useState({});
  const [filterText, setFilterText] = useState('');
  const [filterPrice, setFilterPrice] = useState(0);
  const [filterCourse, setFilterCourse] = useState(0);
  const [filterRepair, setFilterRepair] = useState(0);
  const [filterProducer, setFilterProducer] = useState("null");

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
  }

  const handleSwitchButton = () =>{
    const question = currentAction === "Filtering data ";
    setCurrentAction(question ? "Adding data ": "Filtering data ");
    setIsTablesVisible(!question);
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
        setFormData({ name: "", cena: 0, przebieg: 0, klimatyzacja: 0, sredni_koszt_naprawy: 0});

    })
    .catch(error => {
        setTopTableText('Error sending POST request')
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


  useEffect(() => {
    refreashData();
    refreashProducers();
    minMax();
  }, []);

  useEffect(() => {
    filterCars();
  }, [filterProducer]);






  
  return (
    <>
      <Header
        tables={isTablesVisible}
        
        filterCars={filterCars}
        filterCourse={filterCourse}
        filterPrice={filterPrice}
        filterRepair={filterRepair}
        filterText={filterText}
        
        priceMin={priceMin}
        priceMax={priceMax}
        courseMin={courseMin}
        courseMax={courseMax}
        repairMin={repairMin}
        repairMax={repairMax}
        
        
        producers={producers}
        setFilterProducerFunction={setFilterProducerFunction}
        handleSliderChange={handleSliderChange}
        handleFilteredText={handleFilteredText}/>

      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
          {isTablesVisible ? <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">{"Cars matching your requirements:" + filteredCars.length + " "}
                  <div style={{float:"right"}}>
                    {currentAction}
                    <button onClick={handleSwitchButton}>change Action</button>
                  </div>
                </h3>
              </CardHeader>

              <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                  <tr>
                    <th scope="col" onClick={() =>(refreashData("name", isASC["name"]), toggleSortingOrder("name"))}>Car</th>
                    <th scope="col" onClick={() =>(refreashData("cena", isASC["cena"]), toggleSortingOrder("cena"))}>Price</th>
                    <th scope="col" onClick={() =>(refreashData("przebieg", isASC["przebieg"]), toggleSortingOrder("przebieg"))}>Course</th>
                    <th scope="col" onClick={() =>(refreashData("klimatyzacja", isASC["klimatyzacja"]), toggleSortingOrder("klimatyzacja"))}>AC</th>
                    <th scope="col" onClick={() =>(refreashData("sredni_koszt_naprawy", isASC["sredni_koszt_naprawy"]), toggleSortingOrder("sredni_koszt_naprawy"))}>Avg repair cost</th>
                    <th scope="col" onClick={() =>(refreashData("producer", isASC["producer"]), toggleSortingOrder("producer"))}>Producer</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                {Array.isArray(filteredCars) && filteredCars.length > 0 ? filteredCars.map(element =>{
                      return(
                        <tr>
                          {/* <th scope="row">{element.ID}</th> */}
                          <th scope="row">{element.name}</th>
                          <td>{element.cena}</td>
                          <td>{element.przebieg}</td>
                          <td>{element.klimatyzacja}</td>
                          <td>{element.sredni_koszt_naprawy}</td>
                          <td>{element.producer}</td>
                          <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only text-light"
                          href="#pablo"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => {e.preventDefault()}}
                          >
                            Delete
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                        </tr>
                    )}):<th colspan={7}>There are no cars that match your requirements</th>}
                </tbody>
              </Table>
              </Card>
          :<Card className="bg-default shadow">
              
              <CardHeader className="bg-transparent border-0">
              {topTableText}
              <div style={{float:"right"}} className="text-white mb-0">
                    {currentAction}
                    <button onClick={handleSwitchButton}>change Action</button>
                  </div>
              </CardHeader>
            <form onSubmit={handleSubmitForm}>
               
               <Table
                // style={{textAlign:"center"}}
                className="align-items-center table-dark table-flush"
                responsive
                
              >
                <thead className="thead-dark">
                <tr>
                    <th scope="col">index</th><th>value</th><th>range used in other cars</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <th><label htmlFor="name">Car model: </label></th>
                    <th><input type="text" name="name" id="name" value={formData.name} onChange={handleChange}/></th>
                    <th></th>

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
                    <th><input type="checkbox" name="klimatyzacja" id="klimatyzacja" value={formData.checkbox} onChange={handleChange}/></th>
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
                      <button type="submit">Wyślij</button>
                    </th>
                  </tr>
                </tfoot>
              </Table>
            </form>



            </Card>}
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Tables;
