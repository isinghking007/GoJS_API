using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GoJSAPI.Model
{
    [Table("nodeDataArray")]
    public class NodeDataArray
    {
        [Key]
        public int id { get; set; }
        public string loc { get; set; }
        public string text { get; set; }
    }
}
