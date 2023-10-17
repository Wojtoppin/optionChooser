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
    console.log(newValue)
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
    inputValidChecker();
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
    let cssName = document.getElementById("name");
    let cssCena = document.getElementById("cena");
    let cssPrzebieg = document.getElementById("przebieg");
    let cssSredni_koszt_naprawy = document.getElementById("sredni_koszt_naprawy");
    let cssProducer = document.getElementById("producer");


    

    if(cssName
       && cssCena
        && cssPrzebieg
         && cssSredni_koszt_naprawy
          && cssProducer){
      
      
      let cssNameVisibility = document.getElementById("nameVisibility");
      let cssCenaVisibility = document.getElementById("cenaVisibility");
      let cssPrzebiegVisibility = document.getElementById("przebiegVisibility");
      let cssSredni_koszt_naprawyVisibility = document.getElementById("sredni_koszt_naprawyVisibility");
      
      
      cssName.style.borderColor = "red";
      cssCena.style.borderColor = "red";
      cssPrzebieg.style.borderColor = "red";
      cssSredni_koszt_naprawy.style.borderColor = "red";
      cssProducer.style.borderColor = "red";

      if(formData.name.length <= 0 || formData.name.length > 30){
        infoText += "Car model ";
        cssName.style.borderColor = "red";
        cssNameVisibility.style.visibility = "visible";
      }else{
        cssNameVisibility.style.visibility = "hidden";
        cssName.style.borderColor = "green";
      }

      if(formData.cena < priceMin || formData.cena > priceMax){
        infoText += "Price ";
        cssCena.style.borderColor = "red";
        cssCenaVisibility.style.visibility = "visible";
      }else{
        cssCenaVisibility.style.visibility = "hidden";
        cssCena.style.borderColor = "green";
      }

      if(formData.przebieg < courseMin || formData.przebieg > courseMax){
        infoText += "Course ";
        cssPrzebieg.style.borderColor = "red";
        cssPrzebiegVisibility.style.visibility = "visible";
      }else{
        cssPrzebiegVisibility.style.visibility = "hidden";
        cssPrzebieg.style.borderColor = "green";
      }

      if(formData.sredni_koszt_naprawy < repairMin || formData.sredni_koszt_naprawy > repairMax){
        infoText += "Average repair price ";
        cssSredni_koszt_naprawy.style.borderColor = "red";
        cssSredni_koszt_naprawyVisibility.style.visibility = "visible";
      }else{
        cssSredni_koszt_naprawyVisibility.style.visibility = "hidden";
        cssSredni_koszt_naprawy.style.borderColor = "green";
      }

      if(filterProducer === "null"){
        infoText += "Producer ";
        cssProducer.style.borderColor = "red";
      }else{
        cssProducer.style.borderColor = "green";
      }


      if(infoText.length>0){
        setTopTableText("Incorrect values");
        setTopTableTextColor("red");
      }else{
        setTopTableText("Correct values")
        setTopTableTextColor("green");

    }}
  }
  
  useEffect(() => {
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
          {isTablesVisible ? <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">{"Cars matching your requirements: " + filteredCars.length}
                  <div style={{float:"right"}}>
                    {currentAction}
                    <button onClick={handleSwitchButton}>change Action</button>
                  </div>
                </h3>
              </CardHeader>
              <div>
              <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                  <tr>
                    <th scope="col">Car model: {"  "}
                      <input type="text" name="name" value={filterText} onChange={(event)=>handleFilteredText(event)} onKeyUp={filterCars}/>
                    </th>
                    <th scope="col">Price
                      <input
                        type="range"
                        min={priceMin}
                        max={priceMax}
                        value={filterPrice}
                        onMouseUp={(event) => handleSliderChange(event, 1)}
                        onChange={(event) => handleSliderChange(event, 1)}/>
                    </th>
                    <th scope="col">Course
                    <input
                          type="range"
                          min={courseMin}
                          max={courseMax}
                          value={filterCourse}
                          onMouseUp={(event) => handleSliderChange(event, 2)}
                          onChange={(event) => handleSliderChange(event, 2)}/>
                    </th>
                    <th scope="col">AC
                      <button style={{margin:"0px", padding:"1px"}} onClick={handleACbutton}>Change</button>
                    </th>
                    <th scope="col">Avg repair cost
                      <input
                          type="range"
                          min={repairMin}
                          max={repairMax}
                          value={filterRepair}
                          onMouseUp={(event) => handleSliderChange(event, 3)}
                          onChange={(event) => handleSliderChange(event, 3)}/>
                    </th>

                    <th scope="col">Producer
                    
                    <select onChange={(e) => setFilterProducerFunction(e.target.value)}>
                        <option value="null">All Producers</option>
                        {Array.isArray(producers) &&
                          producers !== undefined &&
                          producers.map((element) => (
                            <option key={element.ID} value={element.producer}>
                              {element.producer}
                            </option>
                          ))}
                      </select>
                    </th>
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
                    )}):<th colSpan={7}>There are no cars that match your requirements</th>}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
              </div>
              </Card>
          :<Card className="shadow">
              
              <CardHeader className="border-0">
              
              <h3 className="mb-0"><span style={{color:topTableTextColor}}>{topTableText}</span>
                <div style={{float:"right"}} className="mb-0">
                  {currentAction}
                    <button onClick={handleSwitchButton}>change Action</button>
                  </div>
                </h3>
              </CardHeader>
            <form onSubmit={handleSubmitForm}>
               
               <Table
                // style={{textAlign:"center"}}
                className="align-items-center table-flush"
                responsive
                
              >
                <thead className="thead-light">
                <tr>
                    <th scope="col">index</th><th>value</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <th><label htmlFor="name">Car model: </label></th>
                    <th>
                      <input style={{float:"left"}} type="text" name="name" id="name" value={formData.name} onChange={handleChange}/>
                      <span id="nameVisibility" style={{float:"left", marginLeft:"2%", color:"red"}}>e.g. "Chevrolet Camaro"</span>
                    </th>
                  </tr>

                  <tr>
                    <th><label htmlFor="cena">Price: </label></th>
                    <th>
                      <input style={{float:"left"}} type="number" name="cena" id="cena" min="0" value={formData.cena} onChange={handleChange}/>
                      <span id="cenaVisibility" style={{float:"left", marginLeft:"2%", color:"red"}}>insert a price that is in between {priceMin}$ - {priceMax}$</span>
                    </th>
                  </tr>
                  
                  <tr>
                    <th><label htmlFor="przebieg">Course: </label></th>
                    <th>
                      <input style={{float:"left"}} type="number" name="przebieg" min="0" id="przebieg" value={formData.przebieg} onChange={handleChange}/>
                      <span id="przebiegVisibility" style={{float:"left", marginLeft:"2%", color:"red"}}>insert a price that is in between {courseMin} km - {courseMax} km</span>
                    </th>

                  </tr>
                  
                  <tr>
                    <th><label htmlFor="klimatyzacja">Air Conditioning: </label></th>
                    <th><input style={{float:"left"}} type="checkbox" name="klimatyzacja" id="klimatyzacja" value={formData.checkbox} onChange={handleChange}/>{""}</th>
                    
                  </tr>
                  
                  <tr>
                    <th><label htmlFor="sredni_koszt_naprawy">Average repair price: </label></th>
                    <th>
                      <input style={{float:"left"}} type="number" min="0" name="sredni_koszt_naprawy" id="sredni_koszt_naprawy" value={formData.sredni_koszt_naprawy} onChange={handleChange}/>
                      <span id="sredni_koszt_naprawyVisibility" style={{float:"left", marginLeft:"2%", color:"red"}}>insert a price that is in between {repairMin}$ - {repairMax}$</span>
                    </th>
                    

                  </tr>
                  
                  <tr>
                    <th>Producer</th>
                    <th>
                      <select id="producer" name="producer" onChange={(e) => setFilterProducerFunction(e.target.value)}>
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



            </Card>}
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Tables;
