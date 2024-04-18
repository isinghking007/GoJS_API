using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GoJSAPI.Model
{
    [Table("LinkDataArray")]
    public class LinkDataArray
    {
        [Key]
        public int LinkNodeId { get; set; }
        public int from { get; set; }
        public int to { get; set; }
        public string progress { get;set; }
        public string text { get; set; }
       

        public DateTime CreatedDate { get; set; }

    }
}
