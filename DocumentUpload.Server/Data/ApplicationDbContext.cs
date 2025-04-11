
using DocumentUpload.Server.Models;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;


namespace DocumentUpload.Server.Data
{
    public class ApplicationDbContext:DbContext
    {

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
         : base(options)

        {
        }

        public DbSet<Documents> Document { get; set; }
    }
}
