import React from 'react';
import AiModelCard from '@/components/learning-hub/AiModelCard';
import UseCaseMatcher from '@/components/learning-hub/UseCaseMatcher';

export const aiModelArsenalCourseData = {
  courseTitle: "AI Model Arsenal: Picking the Right AI for Your Marketing Task",
  courseSubtitle: "2025 Edition",
  courseTier: "Enabler",
  courseIntroduction: (
    <>
      <p>So, you've mastered the basics of prompting (maybe even our "Prompting 101" course!). You can talk to an AI and get it to do some cool stuff. But now you're facing a new challenge: there are a <em>shitload</em> of AI models out there. GPT-this, Claude-that, Llama, Midjourney, Sora... it's a rapidly evolving arsenal.</p>
      <p><strong>Using the wrong AI model for the job is like bringing a butter knife to a gunfight.</strong> You might eventually get there, but it's gonna be messy, inefficient, and probably not the "Diamond Standard" result you need.</p>
      <p>This course is your field guide to the <strong>AI Model Arsenal (2025 Edition)</strong>. We'll cut through the hype and help you understand:</p>
      <ul>
        <li>The major <em>types</em> of AI models relevant to marketers today.</li>
        <li>What each type is best at (its "superpower").</li>
        <li>Which models (or classes of models) to reach for specific marketing tasks – from crafting killer copy to generating stunning visuals and even analyzing data.</li>
        <li>Key considerations for choosing a model beyond just its core function, including deployment options like running models locally.</li>
      </ul>
      <p>By the end of this, you won't just be an AI prompter; you'll be an AI <em>strategist</em>, capable of selecting the right tool AND the right approach from your arsenal to achieve any marketing objective. Let's arm up!</p>
    </>
  ),
  lessons: [
    {
      id: 'module-1-intro',
      title: 'Module 1: The Big Picture – Main Categories',
      type: 'Reading',
      duration: '10 min',
      icon: 'book',
      completed: false,
      content: () => (
        <>
          <p>Before we dive into specific names, let's understand the main <em>categories</em> of AI models that are transforming marketing. As of early 2025, these are the heavy hitters:</p>

          <h3>1. Large Language Models (LLMs) - The Wordsmiths & Thinkers:</h3>
          <AiModelCard
            name="Large Language Models (LLMs)"
            strength="Advanced Text Generation & Reasoning"
            useCases={[
              "Text generation, summarization, Q&A, translation, brainstorming, basic coding.",
            ]}
          />
          <p><strong>Familiar Names (Families/Classes):</strong> GPT series (OpenAI), Claude series (Anthropic), Llama series (Meta), Gemini series (Google).</p>
          <p><strong>Marketing Goldmine For:</strong> Content creation, copywriting, SEO, customer service scripts, research, internal communications.</p>

          <h3>2. Image Generation Models (Diffusion Models, GANs) - The Visual Virtuosos:</h3>
          <AiModelCard
            name="Image Generation Models"
            strength="Creating Original Visuals from Text"
            useCases={[
              "Text-to-image creation (art, photos), image modification, variations.",
            ]}
          />
          <p><strong>Familiar Names (Services/Models):</strong> Midjourney, Stable Diffusion, DALL·E series (OpenAI), Imagen (Google).</p>
          <p><strong>Marketing Goldmine For:</strong> Social media visuals, ad creatives, blog illustrations, product mockups, concept art.</p>

          <h3>3. Video Generation Models - The Emerging Storytellers:</h3>
          <AiModelCard
            name="Video Generation Models"
            strength="Creating Video Clips from Text/Images"
            useCases={[
              "Text-to-video, image animation, video modification.",
            ]}
          />
          <p><strong>Key Superpowers (Evolving Early 2025):</strong></p>
          {/* Latest Buzz Callout */}
          <div className="latest-buzz-callout">
            <p><strong>Latest Buzz:</strong> As of Early 2025, this is a rapidly advancing category. Expect rapid changes here!</p>
          </div>
          <p><strong>Familiar Names (Services/Models):</strong> Sora (OpenAI), Runway Gen-2, Pika Labs.</p>
          <p><strong>Marketing Goldmine For:</strong> Short social ads, animated explainers, dynamic presentation content, storyboarding. <em>Quality & control are key considerations.</em></p>

          <h3>4. Audio & Voice AI Models - The Sound Shapers:</h3>
          <AiModelCard
            name="Audio & Voice AI Models"
            strength="Generating Speech, Music, or Analyzing Audio"
            useCases={[
              "Natural Text-to-Speech (TTS), voice cloning, music generation, transcription, audio analysis.",
            ]}
          />
          <p><strong>Marketing Goldmine For:</strong> Voiceovers, podcast elements, background music, transcribing content, call analysis.</p>

          <h3>5. Data Analysis & Predictive AI Models - The Insight Engines:</h3>
          <AiModelCard
            name="Data Analysis & Predictive AI Models"
            strength="Analyzing Data, Recognizing Patterns, and Making Predictions"
            useCases={[
              "Customer segmentation, churn prediction, sales forecasting, marketing mix modeling.",
            ]}
          />
          <p><strong>How Marketers Encounter Them:</strong> Often embedded in analytics platforms, CRMs, BI software. LLMs are increasingly used as interfaces.</p>
          <p><strong>Marketing Goldmine For:</strong> Ad spend optimization, personalizing journeys, identifying at-risk customers, forecasting demand.</p>

          <p><strong>Key Takeaway for Module 1:</strong> Understanding these broad categories is your first step. Next, we'll explore choosing specific models and then delve into deployment options like local AI.</p>
        </>
      ),
    },
    {
      id: 'module-2-llms',
      title: 'Module 2: Choosing Your Wordsmith – Which LLM for Which Text Task?',
      type: 'Reading',
      duration: '15 min',
      icon: 'book',
      completed: false,
      content: () => (
        <>
          <p>Alright, you know LLMs are your go-to for text-based marketing magic. But with powerhouses like the GPT series, Claude, Llama, and Gemini families all vying for attention, how do you pick the right wordsmith for <em>your specific task</em>?</p>

          {/* Latest Buzz Callout */}
          <div className="latest-buzz-callout">
            <p><strong>Latest Buzz:</strong> As of Early 2025: The LLM landscape is incredibly dynamic. New versions and capabilities are released frequently. While the general characteristics below hold true, <em>always test your specific task on a couple of leading models if possible.</em></p>
          </div>

          <h3>General Strengths & Considerations for Major LLM Families:</h3>
          <ul>
            <li><strong>GPT Series (OpenAI):</strong> Strong reasoning, creative/nuanced text, coding, intricate instructions. Good all-rounder. <em>Consider for:</em> Long-form content, complex prompts, creative campaigns.</li>
            <li><strong>Claude Series (Anthropic):</strong> Excels at long context, detailed instruction adherence, safer outputs, strong summarization. <em>Consider for:</em> Analyzing long documents, detailed reports, brand voice consistency.</li>
            <li><strong>Llama Series (Meta):</strong> Powerful open-source alternatives, strong performance, good for fine-tuning/custom deployments. <em>Consider for:</em> General text tasks, internal tools, cost-effective applications (if self-hosting).</li>
            <li><strong>Gemini Series (Google):</strong> Multimodal understanding (text, code, images), Google ecosystem integration, strong reasoning. <em>Consider for:</em> Tasks involving text & image analysis, visual descriptions.</li>
          </ul>

          <h3>Matching LLM Strengths to Marketing Text Tasks:</h3>
          <ul>
            <li><strong>Long-Form Content:</strong> GPT-4 class, Claude series.</li>
            <li><strong>Short-Form Copywriting:</strong> GPT-4 class, Llama series.</li>
            <li><strong>Creative Brainstorming:</strong> GPT-4 class.</li>
            <li><strong>Technical/Explanatory Writing:</strong> Claude series, GPT-4 class.</li>
            <li><strong>Summarization:</strong> Claude series, GPT-4 class.</li>
            <li><strong>Email Drafting:</strong> Most modern LLMs with detailed prompts.</li>
            <li><strong>Personalization at Scale:</strong> GPT-4 class, Claude series.</li>
          </ul>

          <h3>The "No Single Best" Rule & Experimentation:</h3>
          <p>Don't marry one model. Test key prompts on 2-3. Balance cost vs. performance.</p>

          <p><strong>Key Takeaway for Module 2:</strong> Leading LLMs have general strengths, but the best fit depends on your task, prompting, and experimentation.</p>
        </>
      ),
    },
    {
      id: 'module-3-visuals',
      title: 'Module 3: Visual Impact – Mastering AI for Image & Video Creation in Marketing',
      type: 'Reading',
      duration: '20 min',
      icon: 'video',
      completed: false,
      content: () => (
        <>
          <p>Text is powerful, but visuals often scream louder. AI image and video tools are essential for modern marketers.</p>

          <h3>Image Generation Models:</h3>
          <AiModelCard
            name="Midjourney"
            strength="Artistic, Stylized, Complex Images"
            useCases={[
              "Unique brand mascots, imaginative campaign visuals.",
            ]}
          />
           <AiModelCard
            name="Stable Diffusion"
            strength="Flexibility, Control, Photorealism (with effort), Customization"
            useCases={[
              "Specific product mockups, modifying photos, diverse characters.",
            ]}
          />
           <AiModelCard
            name="DALL·E Series (OpenAI)"
            strength="Ease of Use, Creative/Illustrative Images, Good Natural Language Understanding"
            useCases={[
              "Quick blog/social illustrations, novel concepts.",
            ]}
          />
           <AiModelCard
            name="Imagen (Google) & Similar"
            strength="High Photorealism, Rendering Text in Images"
            useCases={[
              "Realistic product shots, lifestyle ads.",
            ]}
          />

          <h3>Comparison Table (Image Models):</h3>
          <table>
            <thead>
              <tr>
                <th>Feature</th>
                <th>Midjourney</th>
                <th>Stable Diffusion</th>
                <th>DALL·E Series</th>
                <th>Imagen & Similar</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ease of Use</td>
                <td>Moderate</td>
                <td>Moderate to Hard</td>
                <td>Easy</td>
                <td>Easy to Moderate</td>
              </tr>
              <tr>
                <td>Photorealism</td>
                <td>Good to Very Good</td>
                <td>Can be Excellent</td>
                <td>Good</td>
                <td>Very Good to Exc</td>
              </tr>
              <tr>
                <td>Artistic Styles</td>
                <td>Excellent</td>
                <td>Very Good</td>
                <td>Good</td>
                <td>Good</td>
              </tr>
              <tr>
                <td>Control</td>
                <td>Moderate</td>
                <td>Excellent (adv.)</td>
                <td>Moderate</td>
                <td>Good</td>
              </tr>
              <tr>
                <td><strong>Primary Strength</strong></td>
                <td>Artistic Output</td>
                <td>Flexibility/Open</td>
                <td>Creativity/Ease</td>
                <td>Photorealism</td>
              </tr>
            </tbody>
          </table>


          <h3>Video Generation Models (Handle with Care - Evolving Field):</h3>

          {/* Latest Buzz Callout */}
          <div className="latest-buzz-callout">
            <p><strong>Latest Buzz:</strong> As of Early 2025: AI video generation (Sora, Runway Gen-2, Pika Labs) is exploding but has limitations in consistency, control, and artifacts. Factor in time for iteration.</p>
          </div>

          <ul>
            <li><strong>Sora (OpenAI) & Similar High-Fidelity:</strong> Best for (emerging) coherent, longer (up to ~1 min), visually impressive clips. <em>Use for:</em> Short narrative ads, product demo concepts. <em>Considerations:</em> Access, demand, review for glitches.</li>
            <li><strong>Runway Gen-2, Pika Labs, etc.:</strong> Best for shorter clips, image-to-video, specific effects, quick prototyping. <em>Use for:</em> Eye-catching social clips, animated logos. <em>Considerations:</em> Quality/length vary.</li>
          </ul>

          <h3>Key Marketing Considerations for Visual AI:</h3>
          <ul>
            <li><strong>Brand Consistency:</strong> Align AI visuals with your style guide.</li>
            <li><strong>Rights & Copyright:</strong> Understand tool ToS for image/video ownership.</li>
            <li><strong>Ethical Use:</strong> Avoid misleading images, deepfakes, bias.</li>
            <li><strong>The "Human Touch":</strong> Refine AI assets with human design for polish.</li>
            <li><strong>Prompting for Visuals:</strong> Be descriptive (Subject, Style, Composition, Lighting, Colors, References, Technical Details).</li>
          </ul>

          <p><strong>Key Takeaway for Module 3:</strong> Match visual AI strength to your need. For video, experiment cautiously. Master visual prompting.</p>
        </>
      ),
    },
     {
      id: 'module-4-local-ai',
      title: 'Module 4: Beyond the Cloud – Open-Source Models, Ollama, OpenWebUI & Your Data Privacy',
      type: 'Reading',
      duration: '25 min',
      icon: 'book', // Or a custom icon for local/privacy?
      completed: false,
      content: () => (
        <>
          <p>So far, we've mostly talked about using AI models via cloud services (like OpenAI's API, Claude API, or platforms like Midjourney). This is convenient and gives access to cutting-edge tech. But what if you want more control, enhanced privacy, or want to experiment without per-token costs? Enter the world of open-source models run locally.</p>

          {/* Latest Buzz Callout */}
          <div className="latest-buzz-callout">
            <p><strong>Latest Buzz:</strong> As of Early 2025: Running powerful open-source LLMs and even some image models locally is becoming increasingly feasible for individuals and businesses with decent hardware. Tools are making it easier than ever.</p>
          </div>

          <h3>What's the Big Deal with Open-Source & Local AI?</h3>
          <ul>
            <li><strong>Open-Source Models:</strong> These are AI models whose architecture and often pre-trained weights are publicly available. Think of the Llama series from Meta, or various Stable Diffusion versions. This allows developers and researchers to study, modify, and build upon them.</li>
            <li><strong>Running Locally:</strong> Instead of sending your data to a third-party cloud API, you download the model and run it on your own computer or private server.</li>
          </ul>

          <h3>Key Tools Making Local AI Accessible:</h3>
          <AiModelCard
            name="Open-Source Models via Ollama"
            strength="Data Privacy, Customization, Cost Control, Offline Access"
            useCases={[
              "Experimenting with LLMs locally",
              "Running models without per-token costs",
              "Ensuring data privacy (data stays on your machine)",
              "Fine-tuning models on custom data (advanced)",
              "Offline AI access",
            ]}
          />
          <ul>
            <li><strong>Ollama (ollama.ai):</strong> Makes it simple to download, set up, and run many popular open-source LLMs and some multimodal models directly on your machine.</li>
            <li><strong>OpenWebUI (formerly Ollama WebUI):</strong> A user-friendly, web-based interface (like ChatGPT's UI) that connects to your locally running Ollama.</li>
          </ul>

          <h3>Key Benefits for Marketers Considering Local/Open-Source AI:</h3>
          <ul>
            <li><strong>Enhanced Data Privacy & Security:</strong> Your prompts and data <strong>NEVER LEAVE YOUR MACHINE/NETWORK.</strong> Critical for sensitive data.</li>
            <li><strong>Potential for Deep Customization & Fine-Tuning (Advanced):</strong> Fine-tune on your own datasets for brand voice or industry jargon.</li>
            <li><strong>Cost Control (No Per-API-Call Fees):</strong> Run unlimited inferences after initial hardware/setup cost.</li>
            <li><strong>Offline Access & Experimentation:</strong> Use models without internet. Free and open experimentation.</li>
          </ul>

          <h3>Considerations & Challenges:</h3>
          <ul>
            <li><strong>Technical Setup:</strong> Requires more technical comfort than cloud services.</li>
            <li><strong>Hardware Requirements:</strong> Needs significant RAM, CPU, and often a capable GPU.</li>
            <li><strong>Model Performance & "Bleeding Edge":</strong> Latest SOTA models often appear on proprietary cloud first.</li>
            <li><strong>Maintenance & Updates:</strong> You're responsible for updating tools and models.</li>
          </ul>

          <h3>When Should a Marketing Team/Enabler Consider This Path?</h3>
          <ul>
            <li>You handle highly sensitive or confidential marketing data regularly.</li>
            <li>You have a strong need for data privacy.</li>
            <li>You have (or can access) the technical expertise.</li>
            <li>You anticipate high-volume use where API costs could be prohibitive.</li>
            <li>You're interested in exploring fine-tuning (longer-term goal).</li>
            <li>You want a "sandbox" for unrestricted AI experimentation.</li>
          </ul>

          <p><strong>Key Takeaway for Module 4:</strong> Running open-source AI models locally offers control, privacy, and cost savings, but requires technical responsibility and hardware. It's powerful when privacy and control are paramount.</p>
        </>
      ),
    },
    {
      id: 'use-case-matcher',
      title: 'Interactive: Match the Task to the AI Model',
      type: 'Exercise', // Or a custom type?
      duration: '5 min',
      icon: 'question-circle', // Or a custom icon?
      completed: false,
      content: () => (
        <>
          <h2>Match the Marketing Task to the Best AI Model Type and Deployment Method</h2>
          <p>Test your understanding by selecting a marketing task below and seeing which AI model type and deployment method (Cloud or Local) is generally best suited for it.</p>
          <h3>Interactive Tool:</h3>
          <p>Not sure which model to use for your task? Try our interactive matcher:</p>
          <UseCaseMatcher tasks={[
            { id: 'long-form-content', label: 'Long-Form Content' },
            { id: 'marketing-copy', label: 'Marketing Copy' },
            { id: 'image-generation', label: 'Image Generation' },
            { id: 'video-creation', label: 'Video Creation' },
            { id: 'data-analysis', label: 'Data Analysis' }
          ]} />
        </>
      ),
    },
    // More modules to come: "Beyond Generation: AI for Analysis & Automation," "The Right Fit: Factors Beyond Model Type (Cost, Ease of Use, Integration)", "Future Gazing: What's Next in the AI Model Arsenal?")
  ],
};
