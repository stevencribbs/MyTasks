using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TaskDataAccess;

namespace MyTasksAPI.Controllers
{
    [RoutePrefix("api/tasks")]
    public class TasksController : ApiController
    {
        [HttpGet]
        [Route("allTasks")]
        public IEnumerable<Task> Get()
        {
            using (TaskDBEntities entities = new TaskDBEntities())
            {
                return entities.Tasks.ToList();
            }
        }

        [HttpGet]
        [Route("taskById/{id}")]
        public Task Get(int id)
        {
            using (TaskDBEntities entities = new TaskDBEntities())
            {
                return entities.Tasks.FirstOrDefault(t => t.ID == id);
            }
        }

        [HttpGet]
        [Route("tasksByStatus/{status}")]
        public IEnumerable<Task> GetTasksByStatus(int status)
        {
            using (TaskDBEntities entities = new TaskDBEntities())
            {
                return entities.Tasks.Where(t => t.Status == status).ToList();
            }
        }

    }
}
