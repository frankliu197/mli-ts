/// <reference types= "Cypress" /> 

/// context of tests we writing, so todos, tests writing in file are in context of todos
context('Todos',() => { 

    // adds todos, what to do 
    it(' Adds todos', () => { 

        // 1st test, testing to navigate to app url, depending on the system, localhost needs to adjust to specific port
        cy.visit('http://localhost:8080/') 
    
     // make sure length todo array is 0 when we get them
    cy.get('[data-testid="todo"]').should('have.length' , 0);
    
    //Testing funcitonality now 

    // if dropdown accessed and clicked 
   
    cy.get('.dropdown').click({force:true})

    // Testing pagedown functionality, step to access the dropdown
   
    describe('button pressed test', () =>{
        cy.get('#pagedown').click({multiple: true})  
    });
    
    //Second step for dropdown with letter v being inserted as an example
   
    cy.get('#suggest_dropdown').type('v');

    // 3rd step for arrowdown test
    
    cy.get('#down').click({multiple: true})  
    
    //4th step arrowup test
    
    cy.get('#up').click({multiple: true})  

    //5th test for Next Page: shiftarrowdown

    cy.get('#shiftarrowdown').click({multiple: true})   

    //6th test for Prev Page: shiftarrowup

    cy.get('#shiftarrowup').click({multiple: true})

    //7th test for Description: tab

    cy.get('#tab').click({multiple: true})

    // 8th test for Enter: enter

    cy.get('#enter').click({multiple: true})

    ///dropdown
    cy.get('#suggest_dropdown').click();
})
})






