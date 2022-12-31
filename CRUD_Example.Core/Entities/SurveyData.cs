using System.ComponentModel.DataAnnotations;

namespace CRUD_Example.Core.Entities
{
    public class SurveyData
    {
        [Key]
        public int Id { get; set; }
        public string? AnomalyType { get; set; }
        public string? Description { get; set; }
        public List<SurveyValues>? Values { get; set; }
    }
}