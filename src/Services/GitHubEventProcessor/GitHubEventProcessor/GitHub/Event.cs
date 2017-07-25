﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace githubpulluserevents
{	enum EventType
	{
		CreateEvent,
		ForkEvent,
		PushEvent,
		PullRequestEvent,
	}

	class Event
	{
		public string id { get; set; }
		public EventType type { get; set; }
		public Organization actor { get; set; }
		[JsonProperty(PropertyName = "repro")]
		public Repository repository { get; set; }
		public Payload payload { get; set; }

		[JsonProperty(PropertyName = "public")]
		public bool isPublic { get; set; }
		public string created_at { get; set; }
		[JsonProperty(PropertyName = "org")]
		public Organization organization { get; set; }

	}
}
