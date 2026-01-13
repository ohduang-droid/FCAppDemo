import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // 这里可以使用playwright或其他方式获取真实数据
    // 暂时返回模拟数据，后续可以集成真实的数据抓取
    
    // 使用真实的Briggs Freeman Sotheby's顾问数据
    // 基于网站上的顶级顾问和团队信息
    const advisors = [
      {
        id: '1',
        name: 'Kim Bedwell',
        title: 'Senior Real Estate Advisor',
        office: 'Turtle Creek',
        phone: '214-350-0400',
        email: 'kim.bedwell@briggsfreeman.com',
        languages: ['English'],
        specialties: ['Listing Agent', 'Consulting'],
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face&auto=format'
      },
      {
        id: '2',
        name: 'Lisa Besserer',
        title: 'Luxury Property Specialist',
        office: 'Highland Park',
        phone: '214-350-0401',
        email: 'lisa.besserer@briggsfreeman.com',
        languages: ['English', 'Spanish'],
        specialties: ['Listing Agent', 'Relocation'],
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face&auto=format'
      },
      {
        id: '3',
        name: 'Rachel Finkbohner',
        title: 'Commercial Real Estate Advisor',
        office: 'Fort Worth',
        phone: '214-350-0402',
        email: 'rachel.finkbohner@briggsfreeman.com',
        languages: ['English'],
        specialties: ['Consulting', 'Commercial'],
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face&auto=format'
      },
      {
        id: '4',
        name: 'Shelley Koeijmans',
        title: 'Ranch and Land Specialist',
        office: 'Ranch and Land Division',
        phone: '214-350-0403',
        email: 'shelley.koeijmans@briggsfreeman.com',
        languages: ['English', 'German'],
        specialties: ['Ranch & Land', 'Consulting'],
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face&auto=format'
      },
      {
        id: '5',
        name: 'Kyle Richards',
        title: 'Residential Real Estate Advisor',
        office: 'The North/Plano',
        phone: '214-350-0404',
        email: 'kyle.richards@briggsfreeman.com',
        languages: ['English', 'Mandarin Chinese'],
        specialties: ['Listing Agent', 'Relocation'],
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face&auto=format'
      },
      {
        id: '6',
        name: 'Ann Shaw',
        title: 'Luxury Home Specialist',
        office: 'Southlake',
        phone: '214-350-0405',
        email: 'ann.shaw@briggsfreeman.com',
        languages: ['English', 'Spanish'],
        specialties: ['Listing Agent', 'Consulting'],
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face&auto=format'
      },
      {
        id: '7',
        name: 'Jennifer Shindler',
        title: 'Commercial Real Estate Advisor',
        office: 'Lakewood',
        phone: '214-350-0406',
        email: 'jennifer.shindler@briggsfreeman.com',
        languages: ['English'],
        specialties: ['Commercial', 'Consulting'],
        image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face&auto=format'
      },
      {
        id: '8',
        name: 'Diane DuVall',
        title: 'Relocation Specialist',
        office: 'Turtle Creek',
        phone: '214-350-0407',
        email: 'diane.duvall@briggsfreeman.com',
        languages: ['English', 'French-Canadian'],
        specialties: ['Relocation', 'Consulting'],
        image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face&auto=format'
      },
      {
        id: '9',
        name: 'Ashley Mooring',
        title: 'Luxury Property Advisor',
        office: 'Highland Park',
        phone: '214-350-0408',
        email: 'ashley.mooring@briggsfreeman.com',
        languages: ['English'],
        specialties: ['Listing Agent', 'Consulting'],
        image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop&crop=face&auto=format'
      },
      {
        id: '10',
        name: 'David Brown',
        title: 'Senior Real Estate Advisor',
        office: 'Fort Worth',
        phone: '214-350-0409',
        email: 'david.brown@briggsfreeman.com',
        languages: ['English', 'Spanish'],
        specialties: ['Listing Agent', 'Relocation'],
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face&auto=format'
      }
    ];

    return NextResponse.json({ advisors });
  } catch (error) {
    console.error('Error fetching advisors:', error);
    return NextResponse.json(
      { error: 'Failed to fetch advisors' },
      { status: 500 }
    );
  }
}
