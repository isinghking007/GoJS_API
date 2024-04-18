using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GoJSAPI.Model
{
    [Table("linkDataArrayNew")]
    public class LinkDataArrayNew
    {
        
        public int from { get; set; }
        public int to { get; set; }
        public string progress { get; set; }
        public string text { get; set; }
    }
}
