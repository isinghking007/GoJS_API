using GoJSAPI.Model;
using Microsoft.EntityFrameworkCore;

namespace GoJSAPI.DBContext
{
    public class DatabaseConnect:DbContext
    {
        public DatabaseConnect(DbContextOptions dbcontext) : base(dbcontext) { }

        public DbSet<NodeToArray> NodeToArrays { get; set; }
        public DbSet<LinkDataArray> LinkDataArrays { get; set; }
        public DbSet<LinkDataArrayNew> LinkDataArrayNew { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<LinkDataArrayNew>().HasNoKey();
        }
        public DbSet<NodeDataArray> NodeDataArray {get;set;}
    }
}
