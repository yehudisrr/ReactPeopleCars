using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace ReactPeopleCarsSite.Data
{
    public class PeopleCarsRepository
    {
        private readonly string _connectionString;

        public PeopleCarsRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void AddPerson(Person person)
        {
            using var context = new PeopleCarsContext(_connectionString);
            context.People.Add(person);
            context.SaveChanges();
        }

        public List<Person> GetPeople()
        {
            using var context = new PeopleCarsContext(_connectionString);
            return context.People.Include(c => c.Cars).ToList();
        }

        public Person GetPerson(int id)
        {
            using var context = new PeopleCarsContext(_connectionString);
            return context.People.FirstOrDefault(p => p.Id == id);
        }

        public List<Car> GetCarsForPerson(int personId)
        {
            using var context = new PeopleCarsContext(_connectionString);
            return context.Cars.Where(c => c.PersonId == personId).ToList();

        }

        public void AddCar(Car car)
        {
            using var context = new PeopleCarsContext(_connectionString);
            context.Cars.Add(car);
            context.SaveChanges();
        }

        public void DeleteCars(int personId)
        {
            using var contex = new PeopleCarsContext(_connectionString);
            contex.Database.ExecuteSqlInterpolated($"DELETE FROM Cars WHERE PersonId = {personId}");
        }
    }
}