using System.ComponentModel.DataAnnotations;

namespace CRUD_Example.Core.Entities
{
    public class SurveyData
    {
        /// <summary>
        /// ID 
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// Type of anomaly
        /// </summary>
        public string? AnomalyType { get; set; }
        /// <summary>
        /// Description of value list
        /// </summary>
        public string? Description { get; set; }
        /// <summary>
        /// Values of anomalies on searched area
        /// </summary>
        public List<SurveyValue>? Values { get; set; }
    }
}