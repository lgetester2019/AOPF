import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    console.log('=== CREATE POST ===')
    console.log('Received publish_date:', body.publish_date)
    console.log('Type of publish_date:', typeof body.publish_date)

    // Получаем ID категории по slug
    let categoryId = null
    if (body.category) {
      const { data: category } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', body.category)
        .single()
      
      if (category) {
        categoryId = category.id
        console.log('Found category ID:', categoryId)
      }
    }

    const insertData: any = {
      title: body.title,
      description: body.meta_description || body.content?.substring(0, 200) || '',
      content: body.content,
      category_id: categoryId,
      author: body.author,
      status: body.status,
      slug: body.slug,
      image_url: body.image_url,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    // Важно! Добавляем publish_date
    if (body.publish_date) {
      insertData.publish_date = body.publish_date
      console.log('Setting publish_date to:', body.publish_date)
    } else {
      insertData.publish_date = new Date().toISOString()
      console.log('Using current date for publish_date')
    }

    console.log('Insert data:', insertData)

    const { data, error } = await supabase
      .from('posts')
      .insert([insertData])
      .select()
      .single()
    
    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    console.log('Post created:', data)
    console.log('Saved publish_date:', data.publish_date)
    console.log('=== END CREATE ===')
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit') || '50'
    
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        categories:category_id (id, name, slug)
      `)
      .order('publish_date', { ascending: false })
      .limit(parseInt(limit))
    
    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }
    
    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
