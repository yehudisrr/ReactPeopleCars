using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using ReactPeopleCarsSite.Data;

namespace ReactPeopleCarsSite.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleCarsController : ControllerBase
    {
        private string _connectionString;

        public PeopleCarsController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [Route("getpeople")]
        public List<Person> GetPeople()
        {
            var repo = new PeopleCarsRepository(_connectionString);
            return repo.GetPeople();
        }

        [Route("getcars")]

        public List<Car> GetCars(int personId)
        {
            var repo = new PeopleCarsRepository(_connectionString);
            return repo.GetCarsForPerson(personId);
        }

        [HttpPost]
        [Route("addperson")]
        public void AddPerson(Person person)
        {
            var repo = new PeopleCarsRepository(_connectionString);
            repo.AddPerson(person);
        }

        [HttpPost]
        [Route("addcar")]
        public void AddCar(Car car)
        {
            var repo = new PeopleCarsRepository(_connectionString);
            repo.AddCar(car);
        }

        [HttpPost]
        [Route("deletecars")]
        public void DeleteCars(int personId)
        {
            var repo = new PeopleCarsRepository(_connectionString);
            repo.DeleteCars(personId);
        }

        [HttpGet]
        [Route("getbyid")]
        public Person GetById(int id)
        {
            var repo = new PeopleCarsRepository(_connectionString);
            return repo.GetPerson(id);
        }
    }
}
