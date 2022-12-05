require('dotenv').config();
const express = require("express");
/* const morgan = require("morgan"); */
const cors = require("cors");
const Person = require('./models/person')

const app = express();

app.use(express.static('build'))
app.use(express.json());
app.use(cors());

//get front page
app.get("/", (req, res) => {
    res.send("<h1>Hello World!</h1>");
});

//get info page
app.get("/info", (request, response) => {
    const date = new Date();
    Person.find({}).then(people => {
        response.writeHead(200, {
            "Content-type": "text/javascript",
        })
        const body = `Phonebook has data for ${people.length} persons
        ${date}`;
        response.write(body);
        response.end();
    })


});

// get all data
app.get("/api/persons", (request, response) => {
    Person.find({}).then(people => {
        response.json(people)
    })
});

// get one person
app.get("/api/persons/:id", (request, response, next) => {
    Person.findById(request.params.id).then(person => {
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    }).catch(err => next(err))
});
/* 
createId = (arr) => {
    const max = arr.length > 0 ? Math.max(...arr.map((n) => n.id)) : 0;

    return max + 1;
}; */

// add a person
app.post("/api/persons", (request, response) => {
    const body = request.body;

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: "Content is missing",
        });
    } else if (!body.name) {
        return response.status(400).json({
            error: "Name is missing",
        });
    } else if (!body.number) {
        return response.status(400).json({
            error: "Number is missing",
        });
    } else {
        const person = new Person({
            name: body.name,
            number: body.number,
        });
        person
            .save()
            .then(savedPerson => {
                response.json(savedPerson)
            })
    }
});

// delete a person
app.delete("/api/persons/:id", (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        }).catch(err => next(err))
});

//edit a person
app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body;

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})

//unknown endpoint handler
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

//error handler
const errorHandler = (error, request, response, next) => {
    console.log(error.message);
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
