using CRUD_Example.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace CRUD_Example.DAL.NPGSQL
{
    public class EfContext : DbContext
    {
        public DbSet<SurveyData> SurveyDatas { get; set; }
        public DbSet<SurveyValue> SurveyValues { get; set; }

        public EfContext(
            DbContextOptions options)
            : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<SurveyData>().HasMany(p => p.Values).WithOne();

            modelBuilder.Entity<SurveyData>().HasKey(entity => entity.Id);

            modelBuilder.Entity<SurveyValue>().HasKey(entity => entity.Id);
        }
    }
}