using System;
using System.Reflection.Metadata;
using DocumentUpload.Server.Data;
using DocumentUpload.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
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

            string uploadsFolder = Path.Combine(_env.ContentRootPath, "UploadedFiles");
            if (!Directory.Exists(uploadsFolder))
                Directory.CreateDirectory(uploadsFolder);

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(model.File.FileName);
            var filePath = Path.Combine(uploadsFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await model.File.CopyToAsync(stream);
            }
            var provider = new FileExtensionContentTypeProvider();

            if (!provider.TryGetContentType(model.File.FileName, out var contentType))
            {
                contentType = "application/octet-stream"; // Fallback for unknown types
            }

            var document = new Documents
            {
                FileName = model.File.FileName,
                FileType = contentType,
                UploadDate = DateTime.UtcNow,
                FilePath = filePath,
            };

            _context.Document.Add(document);
            await _context.SaveChangesAsync();

            return Ok(document);
        }

        [HttpGet]
        public async Task<IActionResult> GetDocuments()
        {
            var documents = await _context.Document
                .Select(d => new {
                    d.Id,
                    d.FileName,
                    d.FileType,
                    d.UploadDate,
                    d.FilePath // this is the viewable URL
                })
                .ToListAsync();
            //var d= await _context.Document.

            return Ok(documents);
        }

        [HttpGet("view/{id}")]
        public async Task<IActionResult> ViewDocument(int id)
        {
            var document = await _context.Document.FindAsync(id);
            if (document == null)
                return NotFound("Document not found.");

            var filePath = Path.Combine(_env.ContentRootPath, "UploadedFiles", Path.GetFileName(document.FilePath));

            if (!System.IO.File.Exists(filePath))
                return NotFound("File not found on disk.");

            var provider = new FileExtensionContentTypeProvider();

            //if (!provider.TryGetContentType(document.FileName, out var contentType))
            //{
            //    contentType = "application/octet-stream"; // Fallback for unknown types
            //}

            var stream = new FileStream(filePath, FileMode.Open, FileAccess.Read);
            //var contentType = "application/pdf"; // Adjust if needed

            return File(stream, document.FileType, document.FileName);
        }

    }


}