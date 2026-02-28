import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        categories:category_id (id, name, slug)
      `)
      .eq('id', id)
      .single()
    
    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: error.message },
        { status: 404 }
      )
    }
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    
    console.log('=== UPDATE POST ===')
    console.log('ID:', id)
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

    // Подготавливаем данные для обновления
    const updateData: any = {
      title: body.title,
      description: body.meta_description || body.content?.substring(0, 200) || '',
      content: body.content,
      category_id: categoryId,
      author: body.author,
      status: body.status,
      slug: body.slug,
      image_url: body.image_url,
      updated_at: new Date().toISOString()
    }

    // Важно! Добавляем publish_date только если он передан
    if (body.publish_date) {
      updateData.publish_date = body.publish_date
      console.log('Setting publish_date to:', body.publish_date)
    }

    console.log('Update data:', updateData)

    const { data, error } = await supabase
      .from('posts')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Supabase update error:', error)
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    console.log('Update successful:', data)
    console.log('Saved publish_date:', data.publish_date)
    console.log('=== END UPDATE ===')
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error updating post:', error)
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id)
    
    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
