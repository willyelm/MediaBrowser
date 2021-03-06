﻿using MediaBrowser.Model.Entities;
using System;

namespace MediaBrowser.Model.LiveTv
{
    /// <summary>
    /// Class ProgramQuery.
    /// </summary>
    public class ProgramQuery
    {
        public ProgramQuery()
        {
            ChannelIds = new string[] { };
            SortBy = new string[] { };
            Genres = new string[] { };
        }

        /// <summary>
        /// Gets or sets the channel ids.
        /// </summary>
        /// <value>The channel ids.</value>
        public string[] ChannelIds { get; set; }

        /// <summary>
        /// Gets or sets the user identifier.
        /// </summary>
        /// <value>The user identifier.</value>
        public string UserId { get; set; }

        /// <summary>
        /// The earliest date for which a program starts to return
        /// </summary>
        public DateTime? MinStartDate { get; set; }

        /// <summary>
        /// The latest date for which a program starts to return
        /// </summary>
        public DateTime? MaxStartDate { get; set; }

        /// <summary>
        /// The earliest date for which a program ends to return
        /// </summary>
        public DateTime? MinEndDate { get; set; }

        /// <summary>
        /// The latest date for which a program ends to return
        /// </summary>
        public DateTime? MaxEndDate { get; set; }

        /// <summary>
        /// Used to specific whether to return movies or not
        /// </summary>
        /// <remarks>If set to null, all programs will be returned</remarks>
        public bool? IsMovie { get; set; }

        /// <summary>
        /// Skips over a given number of items within the results. Use for paging.
        /// </summary>
        public int? StartIndex { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether this instance has aired.
        /// </summary>
        /// <value><c>null</c> if [has aired] contains no value, <c>true</c> if [has aired]; otherwise, <c>false</c>.</value>
        public bool? HasAired { get; set; }

        /// <summary>
        /// The maximum number of items to return
        /// </summary>
        public int? Limit { get; set; }

        /// <summary>
        /// What to sort the results by
        /// </summary>
        /// <value>The sort by.</value>
        public string[] SortBy { get; set; }

        /// <summary>
        /// The sort order to return results with
        /// </summary>
        /// <value>The sort order.</value>
        public SortOrder? SortOrder { get; set; }

        /// <summary>
        /// Limit results to items containing specific genres
        /// </summary>
        /// <value>The genres.</value>
        public string[] Genres { get; set; }
    }
}