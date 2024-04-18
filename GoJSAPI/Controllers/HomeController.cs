using GoJSAPI.DBContext;
using GoJSAPI.Model;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Text.Json.Nodes;
using System.Text.Json.Serialization;

namespace GoJSAPI.Controllers
{
    [ApiController]
    [Route("Api/[controller]")]
    public class HomeController : Controller
    {
        private readonly DatabaseConnect db;
        public HomeController(DatabaseConnect db)
        {
            this.db = db;
        }

        #region Get Methods
        [HttpGet("DemoNodeToArray")]
        public IActionResult DemoNodeToArray()
        {
            var data = db.NodeToArrays.ToList();
            return Ok(data);
        }
            
        [HttpGet("LinkdataArrayNew")]
        public IActionResult LinkDataArrayMethod()
        {
            var data = db.LinkDataArrayNew.ToList();
            if(data == null)
            {
                return Ok("Not Details");
            }
            return Ok(data);

        }
        [HttpGet("NodeDataArray")]
        public IActionResult NodeDataArrayMethod()
        {
            var data = db.NodeDataArray.Where(val => val.id >= 0).ToList();
            if (data == null)
            {
                return Ok("Not Details");
            }
            return Ok(data);

        }
        #endregion Get Methods

        #region Post Methods

        [HttpPost("working")]
        public IActionResult WorkingNode([FromBody]List<NodeToArray> nodes)
        {
            if (nodes == null)
            {
                // Log or return an error indicating that deserialization failed
                return StatusCode(400, "Invalid JSON format");
            }

            // Add each object to the DbSet and save changes
            foreach (var node in nodes)
            {
                NodeToArray newnode = new NodeToArray()
                {

                    loc = node.loc,
                    text = node.text,
                    Id = node.Id,
                  //  __gohashid = node.__gohashid,
                    CreatedDate = DateTime.Now
                };

                db.NodeToArrays.Add(newnode);
                Console.WriteLine(newnode);

            }
            db.SaveChanges();
            // Optionally return the added objects
            return Ok(nodes);
        }
        [HttpPost("linkarray1")]
        public IActionResult AddLinkArray([FromBody] List<LinkDataArray> nodes)
        {
            return Json(nodes);
        }

        [HttpPost("linkArray")]
        public IActionResult AddLinkToNode([FromBody] List<LinkDataArray> nodes)
        {
            try
            {
                if (nodes == null)
                {
                    // Log or return an error indicating that deserialization failed
                    return StatusCode(400, "Invalid JSON format");
                }

                // Add each object to the DbSet and save changes
                foreach (var node in nodes)
                {
                    LinkDataArray newnode = new ()
                    {

                        from = node.from,
                        to = node.to,
                        text = node.text,
                   //     __gohashid = node.__gohashid,
                        CreatedDate = DateTime.Now
                    };

                    db.LinkDataArrays.Add(newnode);
                    Console.WriteLine(newnode);

                }


                db.SaveChanges();
                // Optionally return the added objects
                return Ok(nodes);
            }
            catch (Exception ex)
            {
                // Handle any exceptions
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        #endregion Post Methods
    }
}
