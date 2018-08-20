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
        public IHttpActionResult Get()
        {
            using (TaskDBEntities entities = new TaskDBEntities())
            {
                IEnumerable<Task> tasks = entities.Tasks.ToList();
                if (tasks == null)
                {
                    return NotFound();
                }
                return Ok(tasks);
            }
        }

        [HttpGet]
        [Route("taskById/{id}")]
        public IHttpActionResult Get(int id)
        {
            using (TaskDBEntities entities = new TaskDBEntities())
            {
                var task = entities.Tasks.FirstOrDefault(t => t.ID == id);

                if (task == null)
                {
                    return NotFound();
                }
                return Ok(task);
            }
        }

        [HttpGet]
        [Route("tasksByOwner/{id}")]
        public IHttpActionResult GetTasksByOwner(int id)
        {
            using (TaskDBEntities entities = new TaskDBEntities())
            {
                var tasks = entities.Tasks.Where(t => t.Owner == id).ToList();

                if (tasks == null)
                {
                    return NotFound();
                }
                return Ok(tasks);
            }
        }

        [HttpGet]
        [Route("tasksByOwnerStatus/{id}")]
        public IHttpActionResult GetTasksByOwnerAndStatus(int id, int status)
        {
            using (TaskDBEntities entities = new TaskDBEntities())
            {
                var tasks = entities.Tasks.Where(t => (t.Owner == id) && (t.Status==status)).ToList();

                if (tasks == null)
                {
                    return NotFound();
                }
                return Ok(tasks);
            }
        }

        [HttpGet]
        [Route("tasksByStatus/{status}")]
        public IHttpActionResult GetTasksByStatus(int status)
        {
            using (TaskDBEntities entities = new TaskDBEntities())
            {
                var tasks = entities.Tasks.Where(t => t.Status == status).ToList();

                if (tasks == null)
                {
                    return NotFound();
                }
                return Ok(tasks);
            }
        }

        [HttpGet]
        [Route("tasksByStatus/{category}")]
        public IHttpActionResult GetTasksByCategory(string category)
        {
            using (TaskDBEntities entities = new TaskDBEntities())
            {
                var tasks = entities.Tasks.Where(t => t.Category == category).ToList();

                if (tasks == null)
                {
                    return NotFound();
                }
                return Ok(tasks);
            }
        }

        [HttpPut]
        [Route("updateTask/{id}")]
        public HttpResponseMessage UpdateTask(int id, [FromBody]Task task)
        {
            try
            {
                using (TaskDBEntities entities = new TaskDBEntities())
                {
                    var tsk = entities.Tasks.FirstOrDefault(t => t.ID == id);

                    if (tsk == null)
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Task with Id = " + id.ToString() + " not found");
                    }

                    if (task.Data != null) tsk.Data = task.Data;
                    if (task.Category != null) tsk.Category = task.Category;
                    if (task.Status != null) tsk.Status = task.Status;
                    if (task.TaskOrder != null) tsk.TaskOrder = task.TaskOrder;
                    if (task.Priority != null) tsk.Priority = task.Priority;

                    entities.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK, tsk);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpPost]
        [Route("addTask")]
        public HttpResponseMessage AddTask([FromBody]Task task)
        {
            try
            {
                using (TaskDBEntities entities = new TaskDBEntities())
                {
                    Task newTask = entities.Tasks.Add(task);
                    entities.SaveChanges();
                    var message = Request.CreateResponse(HttpStatusCode.Created, newTask);
                    message.Headers.Location = new Uri(Request.RequestUri + newTask.ID.ToString());
                    return message;
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpDelete]
        [Route("deleteTask/{id}")]
        public HttpResponseMessage DeleteTask(int id)
        {
            try
            {
                using (TaskDBEntities entities = new TaskDBEntities())
                {

                    Task tsk = entities.Tasks.FirstOrDefault(t => t.ID == id);
                    if (tsk == null)
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Task with Id = " + id.ToString() + " not found");
                    }
                    else
                    {
                        entities.Tasks.Remove(tsk);
                        entities.SaveChanges();
                        return Request.CreateResponse(HttpStatusCode.OK);
                    }
                }
            }
            catch(Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
    }
}
