using Newtonsoft.Json.Linq;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GoJSAPI.Model
{
    [Table("NodeToArray")]
    public class NodeToArray
    {
        [Key]
       public int NodeId { get; set; }
      
        public  string loc { get; set; }
        public  string text { get; set; }
        public int Id { get; set; }
        public  string AppId { get; set; }

        public DateTime CreatedDate { get; set; }


    }
}
