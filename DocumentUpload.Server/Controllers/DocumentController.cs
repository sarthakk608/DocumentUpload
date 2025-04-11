using System;
using System.Reflection.Metadata;
using DocumentUpload.Server.Data;
using DocumentUpload.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DocumentUpload.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class DocumentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _env;


        public DocumentController(ApplicationDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;

        }


        [HttpPost("upload")]
        public async Task<IActionResult> UploadDocument([FromForm] DocumentModel model)
        {
            if (model.File == null || model.File.Length == 0)
                return BadRequest("File is required.");

            using var memoryStream = new MemoryStream();
            await model.File.CopyToAsync(memoryStream);

            var document = new Documents
            {
                FileName = model.File.FileName,
                FileType = model.Type,
                UploadDate = model.Date,
                FileData = memoryStream.ToArray()
            };

            _context.Document.Add(document);
            await _context.SaveChangesAsync();

            return Ok(document);
        }


        //[HttpPost("upload")]
        //public async Task<IActionResult> UploadDocument([FromForm] DocumentModel model)
        //{
        //    if (model.File == null || model.File.Length == 0)
        //        return BadRequest("File is required.");

        //    string uploadsFolder = Path.Combine(_env.ContentRootPath, "UploadedFiles");
        //    if (!Directory.Exists(uploadsFolder))
        //        Directory.CreateDirectory(uploadsFolder);

        //    var fileName = Guid.NewGuid().ToString() + Path.GetExtension(model.File.FileName);
        //    var filePath = Path.Combine(uploadsFolder, fileName);

        //    using (var stream = new FileStream(filePath, FileMode.Create))
        //    {
        //        await model.File.CopyToAsync(stream);
        //    }

        //    var document = new Documents
        //    {
        //        FileName = model.File.FileName,
        //        FileType = model.Type,
        //        UploadDate = model.Date,
        //        FilePath = filePath
        //    };

        //    _context.Document.Add(document);
        //    await _context.SaveChangesAsync();

        //    return Ok(document);
        //}

        [HttpGet]
        public async Task<IActionResult> GetDocuments()
        {
            var documents = await _context.Document
                .Select(d => new
                {
                    d.Id,
                    d.FileName,
                    d.FileType,
                    d.UploadDate
                })
                .ToListAsync();

            return Ok(documents);
        }

        [HttpGet("view/{id}")]

        public async Task<IActionResult> ViewDocument(int id)
        {
            var document = await _context.Document.FindAsync(id);
            if (document == null)
                return NotFound("Document not found.");

            return File(document.FileData, "application/octet-stream", document.FileName);
        }


        //[HttpGet("{id}/view")]
        //public async Task<IActionResult> ViewDocument(int id)
        //{
        //    var document = await _context.Document.FindAsync(id);
        //    if (document == null)
        //        return NotFound("Document not found.");

        //    var memory = new MemoryStream();
        //    using (var stream = new FileStream(document.FilePath, FileMode.Open))
        //    {
        //        await stream.CopyToAsync(memory);
        //    }
        //    memory.Position = 0;

        //    string contentType = "application/octet-stream";
        //    return File(memory, contentType, document.FileName);
        //}
    }
}
