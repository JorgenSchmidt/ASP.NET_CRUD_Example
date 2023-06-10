﻿// <auto-generated />
using System;
using CRUD_Example.DAL.NPGSQL;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace CRUDExample.DAL.NPGSQL.Migrations
{
    [DbContext(typeof(EfContext))]
    [Migration("20230211185255_Initial")]
    partial class Initial
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("CRUD_Example.Core.Entities.SurveyData", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("AnomalyType")
                        .HasColumnType("text");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("SurveyDatas");
                });

            modelBuilder.Entity("CRUD_Example.Core.Entities.SurveyValue", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<double>("Coord_X")
                        .HasColumnType("double precision");

                    b.Property<double>("Coord_Y")
                        .HasColumnType("double precision");

                    b.Property<int?>("SurveyDataId")
                        .HasColumnType("integer");

                    b.Property<double>("Value")
                        .HasColumnType("double precision");

                    b.HasKey("Id");

                    b.HasIndex("SurveyDataId");

                    b.ToTable("SurveyValues");
                });

            modelBuilder.Entity("CRUD_Example.Core.Entities.SurveyValue", b =>
                {
                    b.HasOne("CRUD_Example.Core.Entities.SurveyData", null)
                        .WithMany("Values")
                        .HasForeignKey("SurveyDataId");
                });

            modelBuilder.Entity("CRUD_Example.Core.Entities.SurveyData", b =>
                {
                    b.Navigation("Values");
                });
#pragma warning restore 612, 618
        }
    }
}
