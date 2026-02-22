---
title: AI-driven development: a practical guide
slug: ai-driven-development-practical-guide
excerpt: How I actually use LLMs in my day-to-day engineering work, what works well, and where it falls apart.
tags: ai, developer-tools, productivity
published_at: 2025-08-20
---

There's a lot of hype around AI-assisted development. Most of it focuses on the wrong things: generating boilerplate, autocompleting function names, writing commit messages. The real value is elsewhere, and it requires treating AI tools as a specific kind of collaborator with specific strengths and weaknesses.

Here's how I actually use LLMs in my engineering work.

## Where LLMs excel

### Exploration and prototyping

LLMs are remarkably good at generating first drafts of code in unfamiliar domains. If I need to write a parser for a format I haven't worked with, or integrate with an API I've never used, an LLM can get me to a working prototype in minutes instead of hours.

The key is treating the output as a starting point, not a finished product. I read every line, understand the approach, and then refactor it to fit the codebase's patterns and standards.

### Rubber duck debugging

Explaining a problem to an LLM forces you to articulate it clearly, which often leads to the solution. But unlike a rubber duck, an LLM can actually respond with useful suggestions.

I've found this particularly effective for subtle bugs, the kind where the code looks correct but produces wrong results. Describing the expected behavior, actual behavior, and what I've already checked often leads to the LLM spotting an assumption I hadn't questioned.

### Code review preparation

Before submitting code for review, I'll sometimes ask an LLM to review it first. It catches things like unhandled edge cases, missing error handling, inconsistencies with common patterns, and documentation gaps.

This doesn't replace human review, but it catches the mechanical issues so human reviewers can focus on design and architecture.

### Refactoring tedious code

Large-scale mechanical refactors (renaming patterns, migrating from one API to another, updating test fixtures) are where LLMs save the most time. They're good at applying a consistent transformation across many files, which is exactly the kind of work that's error-prone for humans.

## Where LLMs struggle

### System design

LLMs can describe common architectures, but they can't reason about the specific constraints, trade-offs, and organizational context that drive real system design decisions. Asking an LLM to design your system is like asking someone who's read a lot of architecture textbooks but has never operated a production system.

### Performance-critical code

LLMs tend to generate code that works but isn't optimized. For hot paths, data structure choices, and algorithmic decisions where performance matters, human expertise is still essential. The LLM might suggest a hash map where a sorted array with binary search would be better for the specific access pattern.

### Security-sensitive code

I don't trust LLM-generated code for security-critical paths without thorough review. LLMs reproduce patterns from training data, which includes a lot of insecure code. Authentication, authorization, cryptography, and input validation all need careful human attention.

### Understanding legacy context

Every codebase has historical decisions that made sense at the time. LLMs don't know why your team chose that particular database, or why there's a seemingly-redundant cache layer, or why the deployment process has that extra step. This context matters for making good changes.

## My workflow

I've settled into a rhythm that works for me:

1. Start with a clear problem statement. Write out what you're trying to accomplish before touching the LLM. This forces clarity.
2. Use the LLM for the first draft. Get a working version quickly, but read every line.
3. Refactor to fit the codebase. The LLM's output follows generic patterns. Your codebase has specific patterns. Adapt.
4. Write the tests yourself. LLM-generated tests tend to test the implementation rather than the behavior. Writing tests forces you to think about edge cases.
5. Review with fresh eyes. After integrating LLM-generated code, review the final result as if someone else wrote it. Because, in a meaningful sense, someone else did.

## The meta-point

AI-driven development isn't about replacing engineering judgment. It's about amplifying it. The engineers who benefit most from LLMs are the ones who already have strong fundamentals. They can evaluate the output, catch errors, and integrate it into a coherent system.

If you can't tell whether the LLM's suggestion is good or bad, the tool isn't helping you. It's giving you confident-sounding code that might be subtly wrong. Build your fundamentals first, then use LLMs to move faster.
