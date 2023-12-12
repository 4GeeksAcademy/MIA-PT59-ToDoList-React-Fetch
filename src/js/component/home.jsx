import React, {useState, useEffect} from "react";

//create your first component


const Home = () => {
   
  const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState([]);
    //const saveTodos;
   useEffect(()=>{
      updateEmpty();
   },[])
   useEffect(()=>{
      updateTasks();
   },[todos])

   const updateEmpty = () => {
        //e.preventDefault();

    fetch('https://playground.4geeks.com/apis/fake/todos/user/jethro', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
        console.log(resp.ok); // Will be true if the response is successful
        console.log(resp.status); // The status code=200 or code=400 etc.
        //console.log(resp.text()); // Will try to return the exact result as a string
        return resp.json(); // (returns promise) Will try to parse the result as JSON and return a promise that you can .then for results
    })
    .then(data => {
        // Here is where your code should start after the fetch finishes
        setTodos(data);
          
        //console.log(data); // This will print on the console the exact object received from the server
    });

   }
   
   
    const updateTasks = ()=> {
      
      fetch('https://playground.4geeks.com/apis/fake/todos/user/jethro', {
      method: "PUT",
      body: JSON.stringify(todos),
      headers: {
        "Content-Type": "application/json"
      }
    })
    
    .then(resp => {
        console.log(resp.ok); // Will be true if the response is successful
        console.log(resp.status); // The status code=200 or code=400 etc.
        //console.log(resp.text()); // Will try to return the exact result as a string
       return resp.json(); // (returns promise) Will try to parse the result as JSON and return a promise that you can .then for results
        //setTodos(resp);
      })
    
    .then(data => {
        // Here is where your code should start after the fetch finishes
        console.log(data); // This will print on the console the exact object received from the server
        
      })
    }


    const add = (e) => {
        e.preventDefault();
        const newTasks = [...todos,{ label: "Make the bed", done: false}];
        fetch('https://playground.4geeks.com/apis/fake/todos/user/jethro', {
            method: "POST",
          body: JSON.stringify(todos),
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(resp => {
            resp.status=== 200 ? setTodos(newTasks): "";
        })
    }
    
    const deleteRecords = (e) => {
    console.log("Delete Records !")  
      e.preventDefault();
     
      const newTasks = [...todos,{ label: "Make the bed", done: true}];
      fetch('https://playground.4geeks.com/apis/fake/todos/user/jethro', {
          method: "DELETE",
        body: JSON.stringify(todos),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(resp => {
          resp.status=== 200 ? setTodos(newTasks): "";
      })
  }

/*
    function deleteItem2(index) {
      const updatedTodos = [...todos];
      updatedTodos.splice(index, 1);
      fetch('https://playground.4geeks.com/apis/fake/todos/user/jethro', {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTodos),
      })
        .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        setTodos(updatedTodos);
        console.log(updatedTodos);
        return response.json();
        })
        .catch((error) => console.log(error));
      }

    */


    return (
        <div className="container">
        <h1>My Todos</h1>
                    
        <ul>
          <li id="l1">

            <input type="text" onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                 // updateEmpty(e);
                  
                  setTodos([{label:inputValue,done:false}, ...todos]);
                  setInputValue("");
               
                }
              } }
              placeholder="What do you need to do?">
            </input>
            <button onClick={() => {
             //updateEmpty(e);
             

             setTodos([{label:inputValue,done:false}, ...todos]);
              setInputValue("");

              
            } }>Submit</button>
          </li>
          
          {todos.map((item, index) => (
					<li className="todos" key={index}>
						{item.label}{""} 
						<button ><i 
							onClick = 
							{()=> deleteItem2(index)} 
							className="fas fa-trash-alt"
							></i></button>
					</li>
				))}    
      
      </ul>
    
        <div className="footer">
              <div className="footer-left">
                  <h3> <strong>
                    {todos.length} items left
                        </strong> </h3>
              </div>
              <div className="footer-right">
                    <button type="button" className="btn btn-primary"
                     
                     onClick={(e) => {
                      //setTodos([inputValue, ...todos]);
                      //setInputValue("");
                      deleteRecords(e);
                      setTodos([]);

                     }}
                    >Delete all records</button>
              </div>
        </div>
      </div>
    
    
    )
};
  
  
        
    

export default Home;