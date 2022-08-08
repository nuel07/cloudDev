import express, { Router, Request, Response } from 'express';
import { Car, cars as car_list } from './cars';

( async () => {
    let cars:Car[] = car_list;

    //create express application
    const app = express ();

    //declare default port to listen
    const port = 8082;

    //Root URI call
    app.get( '/', (req: Request, res: Response ) => {
        res.status(200).send('Welcome to the Cloud!');
    });
    
    //GET a greeting specific to a person
    //demonstrates routing parameters i.e host/persons/:name
    app.get('/persons/:name', ( req: Request, res: Response ) => {
        let { name } = req.params;
        if ( !name ){
            return res.status(400).send('Name is required');
        }
        return res.status(200).send(`Welcome to the cloud, ${name}!`);
    });

    //GET a greeting specific to a person using query parameters
    //host/persons?name=the_name
    app.get('/persons', ( req: Request, res: Response ) => {
        let { name } = req.query;
        if ( !name ){
            return res.status(400).send('Name is required');
        }
        return res.status(200).send(`Welcome to the cloud, ${name}!`);
    });

    //POST a greeting to a specific person
    // demonstrates req.body
    app.post('/persons', async( req: Request, res:Response ) => {
        const { name } = req.body;
        if ( !name ) {
            return res.status(400).send('name is required');
        }
        return res.status(200).send(`Welcome the cloud, ${name}!`);
    });

    //endpoint to GET a list of cars filterable by make with query parameter
    app.get( '/cars/', (req: Request, res: Response ) => {
        let { make } = req.query;
        let car_list = cars;
        if(make){
            car_list = cars.filter((car) => car.make === make);
        }
        res.status(200).send(car_list);
    });

    //endpoint to GET specific car, should require id
    //fails gracefully with no id
    app.get("/cars/:id", (req: Request, res:Response) => {
        let { id } = req.params;
        //check to make sure id is set
        if ( !id ) {
            //respond with an error if not
            return res.status(400).send(`id is required`);
        }
        //finding car by id
        const car = cars.filter((car) => car.id == car.id);
        //respond with not found status code if no id is found
        if (car && cars.length === 0){
            return res.status(401).send(`Car not found`);
        }
        //else, return the car that matches the id
        res.status(200).send(car);
    });

    //endpoint to POST a new car to the car_list
    app.post('/cars/', (req:Request, res:Response) => {
        let { make, type, model, cost, id } = req.body;
        //check if all required variables are set
        if ( !id || !make || !model || !type || !cost ){
            return res.status(400).send(`make, type, model, cost and id are all required`);
        }
        //create a new car instance
        const my_car: Car = {
            make: make, type: type, model: model, cost: cost, id: id
        };
        // add my_car to the local variable
        cars.push(my_car);
        //send the complete car object as a response
        //with a 201 - creation success status code
        res.status(201).send(my_car);
    });

    //start the server
    app.listen( port, () => {
        console.log(`server running at http://localhost:${port}`);
        console.log(`press CTRL+C to stop server`);
    });
})();