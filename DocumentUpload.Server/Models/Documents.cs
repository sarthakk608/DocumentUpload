namespace DocumentUpload.Server.Models
{
    public class Documents
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public string FileType { get; set; }
        public DateTime UploadDate { get; set; }
        public string FilePath { get; set; }

    }

    public class DocumentModel
    {
        public IFormFile File { get; set; }
        public string Type { get; set; }
        public DateTime Date { get; set; }
    }
}
