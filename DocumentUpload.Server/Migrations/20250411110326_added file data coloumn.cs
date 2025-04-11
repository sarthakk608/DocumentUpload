using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DocumentUpload.Server.Migrations
{
    /// <inheritdoc />
    public partial class addedfiledatacoloumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FilePath",
                table: "Document");

            migrationBuilder.AddColumn<byte[]>(
                name: "FileData",
                table: "Document",
                type: "varbinary(max)",
                nullable: false,
                defaultValue: new byte[0]);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FileData",
                table: "Document");

            migrationBuilder.AddColumn<string>(
                name: "FilePath",
                table: "Document",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
